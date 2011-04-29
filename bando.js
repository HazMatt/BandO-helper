
// var train_hover = function() { $(this).addClass('hovered') };
// var train_unhover = function() { $(this).removeClass('hovered') };

// enables array.forEach for all browsers
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisp, t[i], i, t);
    }
  };
}

if (!Array.prototype.map)
{
  Array.prototype.map = function(fun /*, thisp */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        res[i] = fun.call(thisp, t[i], i, t);
    }

    return res;
  };
}

$(document).ready(function() {
  
  // initial data 
  function company(name, starting_city, co_color, reference) {
    this.coname = name;
    this.ref = reference;
    this.trains = [];
    this.cities = [starting_city]; //["Baltimore"];
    this.coal = 0;
    this.stock_value = 0;
    this.last_profit = 0;
    this.cocolor = co_color;
  }

  var co_bando = new company("Baltimore & Ohio", "Baltimore", "blue", "co_bando");
  var co_bandm = new company("Boston & Maine", "Boston", "pink", "co_bandm");
  var co_cando = new company("Chesapeake & Ohio", "Richmond", "yellow", "co_cando");
  var co_icent = new company("Illinois Central", "Saint Louis", "orange", "co_icent");
  var co_erie = new company("Erie", "Buffalo", "brown", "co_erie");
  var co_nyc = new company("New York Central", "Albany", "green", "co_nyc");
  var co_nipl = new company("Nickel Plate", "Richmond", "purple", "co_nipl");
  var co_nynhh = new company("New York, New Haven & Hartford", "Saint Louis", 
                              "white", "co_nynhh");
  var co_penn = new company("Pennsylvania", "Buffalo", "red", "co_penn");
  var co_wbsh = new company("Wabash", "Albany", "gray", "co_wbsh");
  
  // collection of the company objects
  var companies = {
    0:co_bando,
    1:co_bandm,
    2:co_cando,
    3:co_icent,
    4:co_erie,
    5:co_nyc,
    6:co_nipl,
    7:co_nynhh,
    8:co_penn,
    9:co_wbsh
  } 
  
  function train (num, level, cost, scrap) {
    this.num = num;
    this.level = level;
    this.cost = cost;
    this.scrap = scrap;
  }
  
  var trains  = new Array();
  trains[0]   = new train(1, 1, 100, 20);
  trains[1]   = new train(2, 1, 95, 20);
  trains[2]   = new train(3,1,90,20);
  trains[3]   = new train(4,1,85,20);
  trains[4]   = new train(5,1,80,20);
  trains[5]   = new train(6,2,140,40);
  trains[6]   = new train(7,2,130,40);
  trains[7]   = new train(8,2,120,40);
  trains[8]   = new train(9,2,110,40);
  trains[9]   = new train(10,2,100,40);
  trains[10]  = new train(11,3,200,60);
  trains[11]  = new train(12,3,185,60);
  trains[12]  = new train(13,3,70,60);
  trains[13]  = new train(14,3,155,60);
  trains[14]  = new train(15,3,140,60);
  trains[15]  = new train(16,4,280,80);
  trains[16]  = new train(17,4,260,80);
  trains[17]  = new train(18,4,240,80);
  trains[18]  = new train(19,4,220,80);
  trains[19]  = new train(20,4,200,80);
  trains[20]  = new train(21,5,380,100);
  trains[21]  = new train(22,5,355,100);
  trains[22]  = new train(23,5,330,100);
  trains[23]  = new train(24,5,305,100);
  trains[24]  = new train(25,5,280,100);
  trains[25]  = new train(26,6,500,120);
  trains[26]  = new train(27,6,470,120);
  trains[27]  = new train(28,6,440,120);
  trains[28]  = new train(29,6,410,120);
  trains[29]  = new train(30,6,380,120);
  
  var cities = new Array('Baltimore', 'Albany', 'Buffalo', 'Saint Louis', 'Richmond', 
                      'Boston', 'Augusta', 'Burlington', 'Concord', 'Portsmouth', 
                      'Hartford', 'Providence', 'New Haven', 'New York', 'Philadelphia',
                      'Washington', 'Dover', 'Norfolk', 'Syracuse', 'Utica', 'Harrisburg',
                      'Pittsburg', 'Detroit', 'Cleveland', 'Wheeling', 'Huntington',
                      'Roanoke', 'Fort Wayne', 'Indianapolis', 'Cincinnati', 'Louisville',
                      'Lexington', 'Chicago', 'Sprintfield', 'Cario');
                      
  // Tech 1: $55, $60, S66 
  // Tech2: $60, $66, $74 
  // Tech 3: $66, $74, $82 
  // Tech 4: S74, $82, $91 
  // Tech 5: $82, $91, $100
       
  // ** add city **
  // co_bando.cities.push();

  function trash_train(company_id, train) {
    var train_id = $.inArray("1", company_id.trains);
    company_id.trains.splice(train_id, 1);
  }
  
  function display_debug() {
    var co_object = companies[$("#accordion").accordion("option", "active")];
    $('#debug_info').html(
      '<b>' + co_object.coname + '</b><br>Trains: ' + debug_train_text(co_object.trains) +
      '<br>Cities: ' + co_object.cities + '<br>Stock Price: ' + co_object.stock_value +
      '<br>Last Profit: ' + co_object.last_profit + '<br>Coal: ' + co_object.coal);
  }
  
  // put together list of a companies trains as a string
  function trl (element, index, array) {
    // console.log("element:" + element.num);
    return element.num + '(L' + element.level + ')';
  }
  
  function debug_train_text(train_obj) {
    if (typeof train_obj[0] != 'undefined') {
      // console.log(train_obj);
      return train_obj.map(trl);
    } else {
      return '';
    }
  }
  
  // function co_info(company_id) {
  //   for(key in company_id) {
  //     [key]+" : "+company_id[key]+"<br>";
  //   }
  // }
  
	// Company list - Accordion
	$("#accordion").accordion({
    active: '.selected',
    // *** stuff to do when a company is selected ***
	  change: function(event, ui) { 
	    $("#buy_next_train")
	          .button( "option", "label", "Buy Train for " + ui.newHeader.text() );
	    $("#buy_next_train").button( "option", "disabled", false);
      console.log(companies[$("#accordion").accordion("option", "active")]);
      display_debug();
  	        
      // console.log(ui.newHeader.text() + "  5");
      // console.log(co_bando);
	  }
  })
  .sortable({
  				axis: "y",
  				handle: "h3" //,
          // stop: function() {
          //  stop = true;
          // }
  });
	
  $(".train_button").button({
    text:false,
	  visible:false,
    // icons:{primary:'train1'}
  }).click(function() {
      $( "#dialog" ).dialog( "enable" );
      $( "#dialog" ).dialog( "open" );
      return false;
    });
  
  // $( ".train_button" ).click(function() {
  //   $( "#dialog" ).dialog( "enable" );
  //   $( "#dialog" ).dialog( "open" );
  //   return false;
  // });
  
  $("#buy_next_train").button({
    disabled:true
  });
  
  // *** when the buy next train button is clicked ***
  $("#buy_next_train").click(function() {
    // the selected company
    var comp = companies[$("#accordion").accordion("option", "active")]; 
	  $("> div.train_icons > button.train1", ("#" + comp.ref)).show("fast");
    // $("> div.train_icons > button.train1", "#co_bando").show("fast");
    // (companies[$("#accordion").accordion("option", "active")]).trains.push('1');
	  (companies[$("#accordion").accordion("option", "active")]).trains.push(trains.shift());
    // trains.shift();
	  update_train_list();
    display_debug();
	  
	  console.log($("> div.train_icons > button", "#co_bando")[1]);
	  console.log(companies[$("#accordion").accordion("option", "active")].ref);
    // co_bando.trains.push('1');
    // console.log((companies[$("#accordion").accordion("option", "active")]).coname);
	  
    // var newTrainButton = $(document.createElement('div'))
    //     .attr("class", "train_button");
		//     var newTrainButton = 
		// $('<button class="train_button train1"></button>');
    // newTrainButton.insertAfter('.bando_trains'); //('.bando_trains');
    // newTrainButton.appendTo('.bando_trains'); 

    // alert( $("#buy_next_train").button("option", "label") );
    // $("bando_trains").addClass("train1");
	  // $('div.bando_trains').hover( train_hover, train_unhover );
    return false;
  });
	
	$( "#dialog" ).dialog({
	  autoOpen: false,
    show: "blind",
		resizable: false,
    // height:140,
    position: [300,100],
		modal: true,
		buttons: {
			"Trash train": function(button) {
			  $(".train1").hide("fast");
			  trash_train(co_bando, '1');
        // $("div.bando_trains button.train1").remove();
        // $( this ).data('t_button').remove();
				$( this ).dialog( "close" );
        // console.log(company_id);
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
	
	function current_train_list () {
	  var html_list = '';
    // console.log (trains);
    if (trains.length < 6) { tl = trains.length } else {tl = 6};
    for (var t = 0; t < tl; t++) {
      // console.log (trains[t]);
      html_list = html_list + '<li class="ui-state-default"> #' + 
          trains[t].num + ' - lvl:' + trains[t].level + ' $' + trains[t].cost + '</li>';
  	}
  	return html_list;
	}
	
  // $('#train_list').html("Train List");
  function update_train_list () {
    $('#train_list').html( current_train_list );
  }
	update_train_list();
	
  // $("#train_button").button({
  //     // icons: {
  //     //       primary: "ui-icon-locked"
  //     //     },
  //     text: true
  //   })
  //   .click(function(){
  //       // alert( "test" );
  //       $( "#dialog" ).dialog( "open" );
  //       return false;
  //   });
	  
  // $( "#train_button" ).click(function() {
  //       $( "#dialog" ).dialog( "open" );
  //       return false;
  //     });
      
  // $('.helpButton').each(function() {  
  //   $.data(this, 'dialog', 
  //     $(this).next('.helpDialog').dialog({
  //       autoOpen: false,  
  //       modal: true,  
  //       title: 'Info',  
  //       width: 600,  
  //       height: 400,  
  //       position: [200,0],  
  //       draggable: false  
  //     })
  //   );  
  // }).click(function() {  
  //     $.data(this, 'dialog').dialog('open');  
  //     return false;  
  // });
	
});







// *** experiments ***

// $(document).ready(function() {
//   $("a").click(function() {
//     alert("This is a test!");
//   });
// });

// $(document).ready(function () {
//     $('select#companies').selectList({ sort: true });
// });

