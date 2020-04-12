
strs = {
iam:'\
|| why are iam objects all global? |they operate across regions\
|| why would you want programmatic access granted via iam <br> (access key & secret key)?| for automation! i need my scripts / terraform to call AWS apis! the only way things are done in production!\
|| how did you set the passwd policies and mfa for aws in the past?| used google console <br> used google authenticator <br> set passwd. lengths\
|| what is the name of this policy? <br> effect: ALLOW <br> action:* <br> resource: *| God mode\
|| why GROUPs and ROLEs? <br> both have policies attached to them| groups == identity <br> roles == activity\
|| would you give aws a group or a role to write to S3? | services take on roles <br> ppl belong to groups\
|| what does this policy do? <img src="aws/policy1.jpg" width=130%>| grant access to ec2 ops all regions all instances except run for t1 t2 t3\
|| why JobFunction policies? |I had to spend so much time figuring these out \
',

test:'\
|| what does this policy do? <img src="aws/policy1.jpg" width=230%>| \
',
}
