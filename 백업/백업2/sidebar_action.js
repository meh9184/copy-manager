 var oTable ;

 document.addEventListener(`visibilitychange`, function() {
     location.reload();
 });

 $(document).ready(function(){
	 oTable = $('#cbtable').DataTable(
		 {
			 sPaginationType:"full_numbers",
			 bSort:false,
			 oLanguage:
				 {
					 oPaginate:
						 {
							 sLast:">>",
							 sFirst:"<<",
							 sPrevious:"<",
							 sNext:">"
						 },
					 sZeroRecords:"No records to display",
					 sInfoEmpty:"No entries to show",
					 sEmptyTable:"No clip found. <br/>Please copy some web content."
				 },
			 aLengthMenu:
				 [
					 [5,10,15,20,-1],
					 [5,10,15,20,"All"]
				 ]
		 	});

	 $("body").on("click",".delete",function(){
		 var J=$(this).attr('remid');
		 getBackground().removeClip(J+"");
		 $(this).parent().parent().remove();
		 //displayRecords();
	 });

	 $("body").on("click",".copyme",function(){
		 copyMe($(this).attr('id'));
	 });

	 displayRecords();

 });

function displayRecords(){
	let clipList=getBackground().getAllClips();

	let len=clipList.length;

	if (len>0){	$("#record").html("");}			
	for(var i=len-1; i>=0; i--) {
		var value =getHTMLEncode(clipList[i]);
		var col1="<div id='"+i+"' class='copyme multiple' alt='Click to copy' title='Click to copy'>"+value+"</div>";
		var col2="<img src='../icons/remove.png' class='delete' alt='Remove from clipboard' remid='"+i+"' title='Remove from clipboard'/>";

		//value="<tr></td><td class='center'><</td></tr>";
		//$("#cbtable tbody").append(value);
		oTable.row.add([col1,col2]).draw();
	}
}

function copyMe(j){
	bg=getBackground();
	clipboardholder=bg.document.getElementById("clipboardholder");
	clipboardholder.style.display="block";
	clipboardholder.value=bg.returnClip(j);
	clipboardholder.select();
	bg.document.execCommand("Copy");
	clipboardholder.style.display="none";
	topBar("Content copied to clipboard!",j)
}

function getHTMLEncode(j) {
	return j.toString()
		.replace(/&/g,"&amp;")
		.replace(/"/g,"&quot;")
		.replace(/</g,"&lt;")
		.replace(/>/g,"&gt;")
}

function getBackground(){
	return chrome.extension.getBackgroundPage()
}

function topBar(j,J){

	var n="#"+J;
	$("<div />",{"class":"topbar",text:j})
		.hide()
		.prependTo(n)
		.slideDown("fast")
		.delay(700)
		.slideUp(function(){
			$(this).remove()
		})
};
