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
					 sEmptyTable:"<br/>복사된 Clip이 없습니다 <br/> Ctrl+C Key로 텍스트를 복사해주세요<br/><br/> "
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

	 $("body").on("click",".delete-all",function(){
	 	getBackground().removeAllClip();
		location.reload();
	 });


	 displayRecords();

 });

function displayRecords(){
	let clipList=getBackground().getAllClips();

	let len=clipList.length;

	if (len>0){	$("#record").html("");}			
	for(var i=len-1; i>=0; i--) {
		var value =getHTMLEncode(clipList[i]);
		var col1="<div id='"+i+"' class='copyme multiple' alt='클립보드에 복사' title='클립보드에 복사'>"+value+"</div>";
		var col2="<img src='../icons/remove16.png' class='delete' alt='클립보드에서 삭제' remid='"+i+"' title='클립보드에서 삭제'/> ";

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
	topBar("클립보드에 복사되었습니다!",j)
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
