		var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
        
        /* Init chart data */
        
		var lineChartData = {
			labels : ["1","2","3","4","5","6","7","8"],
			datasets : [
				{
					label: "My First dataset",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : []
				},
				{
					label: "My Second dataset",
					fillColor : "rgba(151,187,205,0.2)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(151,187,205,1)",
					data : []
				}
			]
		}
        
        
		var LightChartData = {
			labels : ["1","2","3","4","5","6","7","8"],
			datasets : [
				{
					label: "Lux",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : []
				}
			]
		}
        
        var MoistureChartData = {
			labels : ["1","2","3","4","5","6","7","8"],
			datasets : [
				{
					label: "Lux",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : []
				}
			]
		}
        
        var AirChartData = {
			labels : ["1","2","3","4","5","6","7","8"],
			datasets : [
				{
					label: "Lux",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : []
				}
			]
		}
        

		initchart = function(){
				for(var i = 0; i <= 100;i++ )
				{
					lineChartData.labels[i] = i.toString();
					lineChartData.datasets[1].data[i]=0;
					lineChartData.datasets[0].data[i]=0;
                    
                    LightChartData.labels[i] = i.toString();
                    LightChartData.datasets[0].data[i]=0;
                    
                    MoistureChartData.labels[i] = i.toString();
                    MoistureChartData.datasets[0].data[i]=0;
                    
                    AirChartData.labels[i] = i.toString();
                    AirChartData.datasets[0].data[i]=0;
				}
		}
        /* Onload for Grove Temp & Humi */
		window.onload = function(){
				var ctx = document.getElementById("canvas").getContext("2d");
				window.myLine = new Chart(ctx).Line(lineChartData, {
					responsive: true
				});
                
        /*        var ctx = document.getElementById("LightChart").getContext("2d");
				window.myLine = new Chart(ctx).Line(LightChartData, {
					responsive: true
				});
                

                
                var ctx = document.getElementById("AirChart").getContext("2d");
				window.myLine = new Chart(ctx).Line(AirChartData, {
					responsive: true
				});*/
                
			}
        
        /* Onload for Grove Moisture */
        window.onload2 = function() {
                var ctx = document.getElementById("MoistureChart").getContext("2d");
				window.myLine = new Chart(ctx).Line(MoistureChartData, {
					responsive: true
				});
        }
        
        /* Undate for Grove Moisture */
        var index2 = 100;
        var moisture_data = 0;
        update2 = function(data){
			index2 = index2 - 1;
            MoistureChartData.datasets[0].data[100]= moisture_data;

			if (index2 === 0)
				index2 = 100;
		    window.onload2();
			for(var i = 100 ; i >= 0 ;i--)
			{
                MoistureChartData.datasets[0].data[100-i] = MoistureChartData.datasets[0].data[101-i];
			}
		}
        
        /* Update for Grove Temp & Humi  */
        var index = 100;
		var humidity_data = 0;
		var temperature_data =0;
	    update = function(data){
			index = index - 1;
			lineChartData.datasets[0].data[100] = humidity_data;
			lineChartData.datasets[1].data[100] = temperature_data;
			if (index === 0)
				index = 100;
		    window.onload();
			for(var i = 100 ; i >= 0 ;i--)
			{
				lineChartData.datasets[0].data[100-i] = lineChartData.datasets[0].data[101-i];
				lineChartData.datasets[1].data[100-i] = lineChartData.datasets[1].data[101-i];
			}
		}
        
        /*  */
        /* Onload for Grove Digital Light Sensor */
        window.onload3 = function() {
                var ctx = document.getElementById("LightChart").getContext("2d");
				window.myLine = new Chart(ctx).Line(LightChartData, {
					responsive: true
				});
        }
        
        /* Undate for Grove Digital Light Sensor */
        var index3 = 100;
        var light_data = 0;
        update3 = function(data){
			index3 = index3 - 1;
            LightChartData.datasets[0].data[100]= light_data;

			if (index3 === 0)
				index3 = 100;
		    window.onload3();
			for(var i = 100 ; i >= 0 ;i--)
			{
                LightChartData.datasets[0].data[100-i] = LightChartData.datasets[0].data[101-i];
			}
		}
        
        /* Onload for Grove Air Quality Sensor */
        window.onload4 = function() {
                var ctx = document.getElementById("AirChart").getContext("2d");
				window.myLine = new Chart(ctx).Line(AirChartData, {
					responsive: true
				});
        }
        
        /* Undate for Grove Air Quality Sensor */
        var index4 = 100;
        var quality_data = 0;
        update4 = function(data){
			index4 = index4 - 1;
            AirChartData.datasets[0].data[100]= quality_data;
			if (index4 === 0)
				index4 = 100;
		    window.onload4();
			for(var i = 100 ; i >= 0 ;i--)
			{
                AirChartData.datasets[0].data[100-i] = AirChartData.datasets[0].data[101-i];
			}
		}
               
        
		initchart();
		var socket = io();
		socket.on('connect', function(data) {
			socket.emit('join', 'Hello World from client');
		});
		 socket.on('humidity_data', function(msg){
			console.log('humidity_data: ' + msg);
			humidity_data = msg;
			if(humidity_data != null)
				update()
		}); 
		socket.on('temperature_data', function(msg){
			console.log('temperature_data: ' + msg);
			temperature_data = msg;
			if(temperature_data != null)
				update()
		}); 
        
        socket.on('moisture_data', function(msg){
			console.log('moisture_data: ' + msg);
			moisture_data = msg;
			if(moisture_data != null)
				update2();
		}); 
        
        socket.on('light_data', function(msg){
			console.log('light_data: ' + msg);
			light_data = msg;
			if(light_data != null)
				update3();
		}); 
        
        socket.on('quality_data', function(msg){
			console.log('quality_data: ' + msg);
			quality_data = msg;
			if(quality_data != null)
				update4();
		});         
        
		//setInterval(update,1000);
        
        /*
		var ws = new WebSocket('wss://120.25.216.117/v1/node/event');
		ws.onopen = function() {
			ws.send("764934b08798c79192112649b78418aa");
		};
		ws.onmessage = function (evt) {
			alert(evt.data);
		};
		console.log("app end!");
        */