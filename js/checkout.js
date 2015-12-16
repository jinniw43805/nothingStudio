$(document).ready(function($) {
	var total = 0;
	console.log(localStorage);

	$("#Submit").click(function(event) {
		/* Act on the event */
		console.log("submit!!!");

		var name = $("#InputName").val();
		var phone = $("#InputPhone").val();
		var email =$('#InputEmail').val();
		var note =$('#InputNote').val();


		//processing data
		var itemList = [];
		for (var i = 0; i < data.length; i++) {
			itemList+="品名-"+data[i].name+"-"+data[i].color+"-數量:"+data[i].count;
		};

		// var googleForm = $(window).jqGoogleForms({"formKey": "1HfH6pT-OVar1iPDhGxmgiAyp322KkX0RaGk8slOO30w"});

		// googleForm.sendFormData({
		//     "entry_1941581079": "data"

		// });

		$.ajax({
		        method: "POST",
		        dataType : "json",
		        // crossDomain: true,
		        url: "https://docs.google.com/forms/d/1HfH6pT-OVar1iPDhGxmgiAyp322KkX0RaGk8slOO30w/formResponse",
		        data: {
		        	//name
					"entry_1941581079" : name,
					"entry_954027330" : phone,
					"entry_846609138" : email,
					"entry_1712483645" : itemList,
					"entry_1590015872" : note,
					"entry_1712420649":total
					//phone
					//email
					//note
		        }
		    })
		    .done(function(msg) {
		    	console.log("success");
		    });

	});


	//render 

	var checkout = $(".checkout-body")


	var refreshCheckout = function (elem){

		//catch data
		data=store.get("cart");

		//clean up  checkout
		elem.empty();
		
		//render by  row
		for(var i=0;i<data.length;i++){
			rowData=data[i];
			
			elem.append(
				'<div class=row>'+
					'<div class="col-xs-4">'+
						'<h4 class="product-name"><strong>'+rowData.name+'</strong></h4>'+
						'<h4><small>'+rowData.color +'</small></h4>'+
					'</div>'+
					'<div class="col-xs-8">'+
                        '<div class="col-xs-6 text-right">'+                    
							'<h6><strong>'+rowData.price+'<span class="text-muted"> x </span>'+rowData.count+
							'</strong></h6>'+
						'</div>'+
						'<div class="col-xs-6" text-right>'+
							'<h6><strong>'+' = '+(rowData.price*rowData.count)+'</strong></h6>'+
						'</div>'

				);

			elem.append(
				'</div>'+
				'</div>'+'<hr>');

			total+=(rowData.price*rowData.count);
		}

		elem.append("<h4 class='text-right'>"+"Total : "+ "<strong>" + total+ "</strong></h4>'");

	};

	refreshCheckout(checkout);



});