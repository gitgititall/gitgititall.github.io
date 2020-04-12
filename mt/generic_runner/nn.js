
//deeplearning.ai
//https://www.youtube.com/channel/UCcIXc5mJsHVYTZR1maL5l9w/playlists
splash = "<a href=https://www.youtube.com/channel/UCcIXc5mJsHVYTZR1maL5l9w/playlists>deeplearning.ai playlists</a>"
strs = {
cnn:'\
|| detect vert edges in 6x6 image <br> 0 0 0 10 10 10 <br>\
 0 0 0 10 10 10 <br> by convolving a 3x3 matrix. compute \
 and show. | take <br> 1 0 -1 <br> 1 0 -1<br> 1 0 -1 <br>\
 as filter. sum of dot product gives one pixel ... 0 -30 -30 0\
|| why 3x3 filters? | \
|| does Sobel filter compute the <i>derivative?</i> | yes, it is delta f / delta x \
|| why does Sobel filter use <br> -1 0 1 <br> -2 0 2 <br>  -1 0 1 | \
||vert & horiz  edge detection works - how about cat detection? |let  \
the filters be learnt by backprop!\
|| handle colours in image? three separate filters? | \
',
}
