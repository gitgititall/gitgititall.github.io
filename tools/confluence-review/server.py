#!/usr/bin/env python3
"""
Confluence MCP server — lets Claude read Confluence Server/DC pages
so it can review architecture docs against standards.

Required env vars:
  CONFLUENCE_URL    e.g. https://confluence.yourcompany.com
  CONFLUENCE_USER   your username
  CONFLUENCE_TOKEN  Personal Access Token (or password, but PAT is better)
"""

import os
import re
import sys
import httpx
from mcp.server.fastmcp import FastMCP

CONFLUENCE_URL = os.environ["CONFLUENCE_URL"].rstrip("/")
CONFLUENCE_USER = os.environ["CONFLUENCE_USER"]
CONFLUENCE_TOKEN = os.environ["CONFLUENCE_TOKEN"]
VERIFY_SSL = os.environ.get("CONFLUENCE_VERIFY_SSL", "true").lower() != "false"

mcp = FastMCP("confluence")

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _auth() -> tuple[str, str]:
    return (CONFLUENCE_USER, CONFLUENCE_TOKEN)


def _get(path: str, params: dict = None) -> dict:
    url = f"{CONFLUENCE_URL}/rest/api/{path}"
    r = httpx.get(url, auth=_auth(), params=params or {}, verify=VERIFY_SSL, timeout=20)
    r.raise_for_status()
    return r.json()


def _to_text(storage_html: str) -> str:
    """Convert Confluence storage-format HTML to readable plain text."""
    # Headings → markdown-style
    text = re.sub(r"<h([1-6])[^>]*>", lambda m: "\n" + "#" * int(m.group(1)) + " ", storage_html)
    # List items
    text = re.sub(r"<li[^>]*>", "\n- ", text)
    # Paragraphs and divs → newlines
    text = re.sub(r"<(?:p|div|tr|br)[^>]*/?>", "\n", text)
    # Table cells → tab separation
    text = re.sub(r"<t[dh][^>]*>", "\t", text)
    # Strip remaining tags
    text = re.sub(r"<[^>]+>", "", text)
    # Decode common HTML entities
    for entity, char in [("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
                          ("&nbsp;", " "), ("&quot;", '"'), ("&#39;", "'")]:
        text = text.replace(entity, char)
    # Collapse excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text


def _fmt_page(data: dict, include_body: bool = True) -> str:
    title = data.get("title", "")
    space = data.get("space", {}).get("name", "") or data.get("space", {}).get("key", "")
    page_id = data.get("id", "")
    url = f"{CONFLUENCE_URL}/pages/viewpage.action?pageId={page_id}"
    header = f"# {title}\nSpace: {space}  |  ID: {page_id}  |  URL: {url}"
    if not include_body:
        return header
    body_html = data.get("body", {}).get("storage", {}).get("value", "")
    return header + "\n\n" + _to_text(body_html)


# ---------------------------------------------------------------------------
# Tools
# ---------------------------------------------------------------------------

@mcp.tool()
def get_page_by_id(page_id: str) -> str:
    """
    Fetch a Confluence page by its numeric ID.
    Returns the page title, space, URL, and full text content.
    Use this when you have a direct page ID or URL containing ?pageId=...
    """
    data = _get(f"content/{page_id}", {"expand": "body.storage,space,version"})
    return _fmt_page(data)


@mcp.tool()
def get_page_by_title(space_key: str, title: str) -> str:
    """
    Fetch a Confluence page by its space key and exact title.
    Returns the page title, space, URL, and full text content.
    Example: space_key='ARCH', title='API Design Standards'
    """
    data = _get("content", {
        "spaceKey": space_key,
        "title": title,
        "expand": "body.storage,space,version",
        "type": "page",
    })
    results = data.get("results", [])
    if not results:
        return f"No page found with title '{title}' in space '{space_key}'."
    return _fmt_page(results[0])


@mcp.tool()
def search_pages(query: str, space_key: str = "", limit: int = 15) -> str:
    """
    Search Confluence pages using CQL full-text search.
    Returns a list of matching pages (ID, space, title) — does NOT return full content.
    Follow up with get_page_by_id to read any page in full.

    Args:
        query:     search terms, e.g. 'architecture standards security'
        space_key: optional — restrict results to one space, e.g. 'ARCH'
        limit:     max results to return (default 15)
    """
    cql = f'type=page AND text ~ "{query}"'
    if space_key:
        cql += f' AND space = "{space_key}"'
    data = _get("content/search", {"cql": cql, "limit": limit, "expand": "space"})
    results = data.get("results", [])
    if not results:
        return "No pages found."
    lines = ["Found pages:\n"]
    for r in results:
        sk = r.get("space", {}).get("key", "?")
        lines.append(f"  ID: {r['id']}  |  Space: {sk}  |  Title: {r['title']}")
    return "\n".join(lines)


@mcp.tool()
def list_pages_in_space(space_key: str, title_contains: str = "", limit: int = 50) -> str:
    """
    List pages in a Confluence space, optionally filtered by a word in the title.
    Returns ID and title only — use get_page_by_id to read content.

    Args:
        space_key:      e.g. 'ARCH' or 'STANDARDS'
        title_contains: optional keyword filter, e.g. 'standard' or 'guideline'
        limit:          max results (default 50)
    """
    params = {
        "spaceKey": space_key,
        "type": "page",
        "limit": limit,
        "expand": "version",
    }
    if title_contains:
        params["title"] = title_contains
    data = _get("content", params)
    results = data.get("results", [])
    if not results:
        return f"No pages found in space '{space_key}'."
    lines = [f"Pages in {space_key}:\n"]
    for r in results:
        lines.append(f"  ID: {r['id']}  |  {r['title']}")
    return "\n".join(lines)


@mcp.tool()
def get_child_pages(page_id: str) -> str:
    """
    List the direct child pages of a given Confluence page.
    Useful for navigating a standards hierarchy (e.g. find all pages under 'Architecture Standards').
    Returns ID and title for each child — use get_page_by_id to read content.
    """
    data = _get(f"content/{page_id}/child/page", {"limit": 50})
    results = data.get("results", [])
    if not results:
        return "No child pages found."
    lines = [f"Child pages of {page_id}:\n"]
    for r in results:
        lines.append(f"  ID: {r['id']}  |  {r['title']}")
    return "\n".join(lines)


if __name__ == "__main__":
    missing = [v for v in ("CONFLUENCE_URL", "CONFLUENCE_USER", "CONFLUENCE_TOKEN") if not os.environ.get(v)]
    if missing:
        print(f"ERROR: missing env vars: {', '.join(missing)}", file=sys.stderr)
        sys.exit(1)
    mcp.run()
