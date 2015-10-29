/**
 *
 * HTML5 Color Picker
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */

$(function(){
    var bCanPreview = true; // can preview

    // create canvas and context objects
    var canvas = document.getElementById('picker');
    var ctx = canvas.getContext('2d');

    // drawing active image
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }

    // select desired colorwheel
    var imageSrc = 'images/colorwheel1.png';
    switch ($(canvas).attr('var')) {
        case '2':
            imageSrc = 'images/colorwheel2.png';
            break;
        case '3':
            imageSrc = 'images/colorwheel3.png';
            break;
        case '4':
            imageSrc = 'images/colorwheel4.png';
            break;
        case '5':
            imageSrc = 'images/colorwheel5.png';
            break;
    }
    image.src = imageSrc;

    $('#picker').mousemove(function(e) { // mouse move handler
        if (bCanPreview) {
            // get coordinates of current position
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            // get current pixel
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;

            // update preview color
            var pixelColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
            $('.preview').css('backgroundColor', pixelColor);

            // update controls
            $('#rVal').val(pixel[0]);
            $('#gVal').val(pixel[1]);
            $('#bVal').val(pixel[2]);
            $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);

            var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
            $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
        }
    });
    $('#picker').click(function(e) { // click event handler
       bCanPreview = !bCanPreview;
    }); 
    $('.preview').click(function(e) { // preview click
        $('.colorpicker').fadeToggle("slow", "linear");
        bCanPreview = true;
    });
   
    var ic = 0;
    function getData(){
      var d1 = [];
      for (var i = 0 ; i < 190 ; i += 0.1)
        d1.push([i, 5+5 * Math.sin(i - ic)]);
    
      if (ic==21) {ic=0;} else {ic = ic +1;}
      ic = Math.round(ic*21)/21;
     
      return d1;
    }
    
    function update(){
      plot.setData([getData()]);
      var d=new Date();
      $("#temperature").text(d.toTimeString());
      $("#select1").text("Buzzer");
      plot.draw();
    }
    
    var plot = $.plot($("#myChart"), [ getData()],{
    	  series: {//控制线的填充、点的显示  
          lines: { show: true},  
          points: { show: false}  
        },  
        //开启鼠标移动和点击事件  折线图外框颜色 和 外框的宽度  
      //  grid: { hoverable: true, clickable: true, borderColor:'#000',borderWidth:1},  
        xaxis: {//x轴的最大最小范围 和 刻度自定义。  
          min: 0,  
          max: 22,  
          ticks: [1,3,5,7,9,11,13,15,17,19,21]  
        },  
        yaxis: {//y轴的最小范围  
          min: 0,  
          max: 10,  
      
        }  
    });
    //500ms更新一次
    var int = self.setInterval(function(){update()},500); 
    
    
});