$(document).ready(function(){
var PostDataStr = "";
AjaxProc(getchartmodel_url,PostDataStr, function(data){

  SearchTextArr = data["searchmenu"];
  CheckboxTextArr = data["checkboxmenu"];
  MenuBarTextArr = data["menubardata"];
  SearchTableArr = data["searchtabledata"];

  //HTMLに初期データ格納
  SetNowDayType();
  SetMenuBar();
  SetTableColomn();
  SetUnderInputDate();
  SetTopCheckBoxColomn();
  SetSelectMenu();
  SetSelectMenuColomn();
  $(".graph-type-area").append(SelectGraphTypeHtml(1));

  //グラフ初期値取得
  var SearcIdsStr = SearchIdArrStr();
	var checkIdsStr = checkedIdArrStr();
  var PostDataStr = "daytype=" + NowDayType + "&searchids=" + SearcIdsStr + "&checkids=" + checkIdsStr;
  reloadData(NowDayType,PostDataStr);
	SetGraphTitle(NowDayType);
	SetCalenderButtonText(NowDayType);
});

var ind_ai=0;
showAiText(ind_ai%4);
setInterval(function(){
  ind_ai += 1;
  showAiText(ind_ai%4);
},16000);

//カレンダー年ボタン
$(this).on("click",".ca-year-button",function(){
  showYear();
});

//カレンダー月ボタン
$(this).on("click",".ca-month-button",function(){
  showMonth();
});

//カレンダー日ボタン
$(this).on("click",".ca-day-button",function(){
  showDay();
});

//カレンダー週ボタン
$(this).on("click",".ca-week-button",function(){
  showWeek();
});

//期間検索指定ボタン
$(".ca-input-own-button").click(function(){
  var startday_str = $(".ca-input-own-startday").val();
  var endday_str = $(".ca-input-own-endday").val();
  var startday = new Date(startday_str);
  var endday = new Date(endday_str);
  showPeriod(startday,endday);
});

//カレンダー戻るボタン
$(".ca-prev-calendar").click(function(){

	if(NowDayType == "m"){
  	CurrentDate.setMonth(CurrentDate.getMonth() - 1);
  	showMonth();
	}else if(NowDayType == "d"){
  	CurrentDate.setDate(CurrentDate.getDate() - 1);
  	showDay();
  }else if(NowDayType == "y"){
  	CurrentDate.setFullYear(CurrentDate.getFullYear() - 1);
  	showYear();
  }else if(NowDayType == "w"){
  	CurrentDate.setDate(CurrentDate.getDate() - 7);
  	showWeek();
  }

});

//カレンダー進むボタン
$(".ca-next-calendar").click(function(){

	if(NowDayType == "m"){
  	CurrentDate.setMonth(CurrentDate.getMonth() + 1);
  	showMonth();
	}else if(NowDayType == "d"){
  	CurrentDate.setDate(CurrentDate.getDate() + 1);
  	showDay();
  }else if(NowDayType == "y"){
  	CurrentDate.setFullYear(CurrentDate.getFullYear() + 1);
  	showYear();
  }else if(NowDayType == "w"){
  	CurrentDate.setDate(CurrentDate.getDate() + 7);
  	showWeek();
  }

});

//チェックボックス
$(this).on("click",".ca-menu-checkbox",function(){
  var index = parseInt($(this).val());
  CheckboxTextArr[index]["flag"] = $(this).prop('checked');
  SelectChangeReloadChart();
});

//グラフタイプ一覧セレクトボックス
$(this).on("change",".graph-type-select",function(){
  var index = parseInt($(this).val());
  var GraphSelectTypeId = parseInt($(this).attr("id"));
  var colmunid = 0;
  $('.graph-type-select').each(function(ind, element){
    if($(element).attr("id") == GraphSelectTypeId){
      colmunid = ind;
    }
  });
  GraphTypeIndexArr[colmunid] = index;

  SelectChangeReloadChart();
});

//カラム一覧セレクトボックス
$(this).on("change",".ca-column-button",function(){

  var SelectedMenuTypeId = parseInt($(this).val());
  if(SelectedMenuTypeId == 0){
    //セレクトメニュー削除
  	var CalenderSearchId = parseInt($(this).attr("id"));
  	$(".ca-column-area").children(".ca-column-button-wrapper").children("#" + CalenderSearchId).remove();
  	CalenderSelectBoxArr = removeFindArr(CalenderSelectBoxArr,CalenderSearchId);
  	var colmunid = 0;
    $('.graph-type-select').each(function(ind, element){
      if($(element).attr("id") == CalenderSearchId + 1){
        colmunid = ind;
      }
    });
    $(".graph-type-area").children(".graph-type-select-area").children("#" + (CalenderSearchId + 1)).parent().remove();
  	GraphTypeIndexArr.splice(colmunid, 1);

	}else{
    //セレクトメニュー追加
  	var now_id = parseInt($(this).attr("id"));
  	if(Math.max.apply(null, CalenderSelectBoxArr) == now_id){
    	var CalenderSearchId = now_id + 1;
    	CalenderSelectBoxArr.push(CalenderSearchId);
    	$(".ca-column-area").append(SelectMenuHtml(CalenderSearchId));
    	var RecommendGraphTypeId = (GraphTypeIndexArr.length > 0) ? GraphTypeIndexArr[GraphTypeIndexArr.length - 1] : 1;
    	GraphTypeIndexArr.push(RecommendGraphTypeId);
    	$(".graph-type-area").append(SelectGraphTypeHtml(CalenderSearchId));
  	}
	}

  SelectChangeReloadChart();
});

});
