anychart.onDocumentReady(function() {

	// set the data
	var data = [
		{x: "Apple", value: 2235265},
		{x: "Ball", value: 38929319},
		{x: "American Indian and Alaska Native", value: 2932248},
		{x: "Asian", value: 14674252},
		{x: "Native Hawaiian and Other Pacific Islander", value: 540013},
		{x: "Some Other Race", value: 19107368},
		{x: "Two or More Races", value: 9009073}
	];
  
	// create the chart
	var chart = anychart.pie();
  
	// set the chart title
	chart.title("Pollution Index: 2022");
  
	// add the data
	chart.data(data);
  
	// display the chart in the container
	chart.container('container');
	chart.draw();
  
  });