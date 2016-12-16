//グラフタイトル更新
function SetGraphTitle(type){
  if(type == "m"){
    GraphTitle = CurrentDate.getFullYear() + "年" + (CurrentDate.getMonth() + 1) + "月";
  }else if(type == "d"){
    var yobi = getYobiStr(CurrentDate.getFullYear(), (CurrentDate.getMonth() + 1), CurrentDate.getDate());
    GraphTitle = CurrentDate.getFullYear() + "年" + (CurrentDate.getMonth() + 1) + "月" + CurrentDate.getDate() + "日" + "(" + yobi + ")";
  }else if(type == "y"){
    GraphTitle = CurrentDate.getFullYear() + "年";
  }else if(type == "w"){
    var tmpdate = new Date();
    tmpdate = getOfBeforeAfterDays(CurrentDate, -6);
    prev_day = tmpdate.getFullYear() + "年" + (tmpdate.getMonth() + 1) + "月" + tmpdate.getDate() + "日";
    now_day = (CurrentDate.getMonth() + 1) + "月" + CurrentDate.getDate() + "日";
    GraphTitle = prev_day + "〜" + now_day;
  }else if(type == "p"){
    var startday_str = $(".ca-input-own-startday").val();
    var endday_str = $(".ca-input-own-endday").val();
    var startday = new Date(startday_str);
    var endday = new Date(endday_str);
    prev_day = startday.getFullYear() + "年" + (startday.getMonth() + 1) + "月" + startday.getDate() + "日";
    now_day =  endday.getFullYear() + "年" + (endday.getMonth() + 1) + "月" + endday.getDate() + "日";
    GraphTitle = prev_day + "〜" + now_day;
  }
}

//グラフnext,prevボタンテキスト更新
function SetCalenderButtonText(type){
  var tmpdate = new Date();

  if(type == "m"){
    tmpdate.setMonth(CurrentDate.getMonth() + 1)
  	$(".ca-next-calendar").text((tmpdate.getMonth() + 1) + "月");
    tmpdate.setMonth(CurrentDate.getMonth() - 1)
  	$(".ca-prev-calendar").text((tmpdate.getMonth() + 1) + "月");
	}else if(type == "d"){
    tmpdate = getOfBeforeAfterDays(CurrentDate, 1);
  	$(".ca-next-calendar").text((tmpdate.getMonth() + 1) + "月" + tmpdate.getDate() + "日");
    tmpdate = getOfBeforeAfterDays(CurrentDate, -1);
  	$(".ca-prev-calendar").text((tmpdate.getMonth() + 1) + "月" + tmpdate.getDate() + "日");
  }else if(type == "y"){
  	$(".ca-next-calendar").text("来年");
  	$(".ca-prev-calendar").text("前年");
  }else if(type == "w"){
    tmpdate = getOfBeforeAfterDays(CurrentDate, -7);
    tmpdate2 = getOfBeforeAfterDays(tmpdate, -6);
  	$(".ca-prev-calendar").text(tmpdate2.getDate() + "日" + "〜" + tmpdate.getDate() + "日");
    tmpdate = getOfBeforeAfterDays(CurrentDate, 7);
  	$(".ca-next-calendar").text(CurrentDate.getDate() + "日" + "〜" + tmpdate.getDate() + "日");
  }else if(type == "p"){
  	$(".ca-next-calendar").text("");
  	$(".ca-prev-calendar").text("");
  }
}

//show aitext
function showAiText(ind){
  setTimeout(function(){
  
    $(".main-info").hide();
    $(".sub-info").hide();
    
    var moji = "解析によると... ";
    $(".ai-info").html(moji);
    $(".ai-info").fadeIn();
    
    setTimeout(function(){
      var moji = ["９月以降からユーザAのページA滞在時間が減少傾向にあります。",
      "ユーザDが毎回スクロールしてクリックしないため商品表示アルゴリズムの変更が効果的です。",
      "2016/9以降からUIパーツ②での離脱率が多く発生しています。",
      "ユーザBは18時から22時にUIパーツCへのアクセスが多いです。"
      ];
      $(".ai-info").html($(".ai-info").html() + moji[ind]);
      
      setTimeout(function(){
        $(".ai-info").hide();
        $(".main-info").fadeIn();
        $(".sub-info").fadeIn();
      
      }, 8000);
      
    }, 2000);
  
  }, 2000);
}

function showPeriod(startday,endday){
	NowDayType = "p";

	CaButtonSelect(NowDayType);
	SetGraphTitle(NowDayType);
	SetCalenderButtonText(NowDayType);
	var SearcIdsStr = SearchIdArrStr();
	var checkIdsStr = checkedIdArrStr();
  var date_start = startday.getFullYear() + "-" + (startday.getMonth() + 1) + "-" + startday.getDate();
  var date = endday.getFullYear() + "-" + (endday.getMonth() + 1) + "-" + endday.getDate();
	var PostDataStr = "daytype=" + NowDayType + "&date_start=" + date_start + "&date=" + date + "&searchids=" + SearcIdsStr + "&checkids=" + checkIdsStr;
	reloadData(NowDayType,PostDataStr);
}

function showDay(){
	NowDayType = "d";

	CaButtonSelect(NowDayType);
	SetGraphTitle(NowDayType);
	SetCalenderButtonText(NowDayType);
	var SearcIdsStr = SearchIdArrStr();
	var checkIdsStr = checkedIdArrStr();
  var date = CurrentDate.getFullYear() + "-" + (CurrentDate.getMonth() + 1) + "-" + CurrentDate.getDate();
	var PostDataStr = "daytype=" + NowDayType + "&date=" + date + "&searchids=" + SearcIdsStr + "&checkids=" + checkIdsStr;
	reloadData(NowDayType,PostDataStr);
}

function showMonth(){
	NowDayType = "m";
	
	CaButtonSelect(NowDayType);
	SetGraphTitle(NowDayType);
	SetCalenderButtonText(NowDayType);
	var SearcIdsStr = SearchIdArrStr();
	var checkIdsStr = checkedIdArrStr();
  var date = CurrentDate.getFullYear() + "-" + (CurrentDate.getMonth() + 1) + "-" + CurrentDate.getDate();
	var PostDataStr = "daytype=" + NowDayType + "&date=" + date + "&searchids=" + SearcIdsStr + "&checkids=" + checkIdsStr;
	reloadData(NowDayType,PostDataStr);
}

function showWeek(){
	NowDayType = "w";

	CaButtonSelect(NowDayType);
	SetGraphTitle(NowDayType);
	SetCalenderButtonText(NowDayType);
	var SearcIdsStr = SearchIdArrStr();
	var checkIdsStr = checkedIdArrStr();
  var date = CurrentDate.getFullYear() + "-" + (CurrentDate.getMonth() + 1) + "-" + CurrentDate.getDate();
	var PostDataStr = "daytype=" + NowDayType + "&date=" + date + "&searchids=" + SearcIdsStr + "&checkids=" + checkIdsStr;
	reloadData(NowDayType,PostDataStr);
}

function showYear(){
	NowDayType = "y";

	CaButtonSelect(NowDayType);
	SetGraphTitle(NowDayType);
	SetCalenderButtonText(NowDayType);
	var SearcIdsStr = SearchIdArrStr();
	var checkIdsStr = checkedIdArrStr();
  var date = CurrentDate.getFullYear() + "-" + (CurrentDate.getMonth() + 1) + "-" + CurrentDate.getDate();
	var PostDataStr = "daytype=" + NowDayType + "&date=" + date +　"&searchids=" + SearcIdsStr + "&checkids=" + checkIdsStr;
	reloadData(NowDayType,PostDataStr);
}

function SelectChangeReloadChart(){
  if(NowDayType == "p"){
    var startday_str = $(".ca-input-own-startday").val();
    var endday_str = $(".ca-input-own-endday").val();
    var startday = new Date(startday_str);
    var endday = new Date(endday_str);
    var SearcIdsStr = SearchIdArrStr();
    var checkIdsStr = checkedIdArrStr();
    var tmp = startday.getFullYear() + "-" + (startday.getMonth() + 1) + "-" + startday.getDate();
    var tmp2 = endday.getFullYear() + "-" + (endday.getMonth() + 1) + "-" + endday.getDate();
    var PostDataStr = "daytype=" + NowDayType + "&date_start=" + tmp + "&date=" + tmp2 + "&searchids=" + SearcIdsStr + "&checkids=" + checkIdsStr;
    reloadData(NowDayType,PostDataStr);
	}else{
    var date = CurrentDate.getFullYear() + "-" + (CurrentDate.getMonth() + 1) + "-" + CurrentDate.getDate();
    var SearcIdsStr = SearchIdArrStr();
    var checkIdsStr = checkedIdArrStr();
    var PostDataStr = "daytype=" + NowDayType + "&date=" + date + "&searchids=" + SearcIdsStr + "&checkids=" + checkIdsStr;
    reloadData(NowDayType,PostDataStr);
	}
}

function SetSelectMenu(){
  for(var i=0;i<SearchTextArr.length;i++){
    $(".ca-column-button").append("<option value='" + (i + 1) + "'>" + SearchTextArr[i] + "</option>");
  }
}

function SetSelectMenuColomn(){
  for(var i=1;i<=SearchTextArr.length;i++){
    $(".ca-column-area").append(SelectMenuHtml(i));
    if(i==2)break;
  }
}

function SetUnderInputDate(){  
  var nowdate = new Date();  
  var nowdate_str = nowdate.getFullYear() + "-" + ("0"+(nowdate.getMonth() + 1)).slice(-2) + "-01";
  $(".ca-input-own-startday").val(nowdate_str);
  var nowdate_str = nowdate.getFullYear() + "-" + ("0"+(nowdate.getMonth() + 1)).slice(-2) + "-" + ("0"+nowdate.getDate()).slice(-2);
  $(".ca-input-own-endday").val(nowdate_str);
}

function SetTableColomn(){
  for(var i=0;i<SearchTableArr.length;i++){
    $(".searching-table").append("<tr><td>" + (i + 1) + "</td><td>" + SearchTableArr[i]["tablename"] + "</td></tr>");
  }
}

function SetNowDayType(){
  for(var i=0;i<MenuBarTextArr.length;i++){
    if(MenuBarTextArr[i]["flag"]){
      NowDayType = MenuBarTextArr[i]["id"];
      break;
    } 
  }
}

function SetMenuBar(){
  var t = "<ul class='nav nav-tabs'>";
  t = t + "<li role='presentation' class='" + (MenuBarTextArr[0]["flag"] ? "active " : "") +  "ca-day-button'><a href='#' class='ca-button-a'>" + MenuBarTextArr[0]["title"] + "</a></li>";
  t = t + "<li role='presentation' class='" + (MenuBarTextArr[1]["flag"] ? "active " : "") +  "ca-week-button'><a href='#' class='ca-button-a'>" + MenuBarTextArr[1]["title"] + "</a></li>";
  t = t + "<li role='presentation' class='" + (MenuBarTextArr[2]["flag"] ? "active " : "") +  "ca-month-button'><a href='#' class='ca-button-a'>" + MenuBarTextArr[2]["title"] + "</a></li>";
  t = t + "<li role='presentation' class='" + (MenuBarTextArr[3]["flag"] ? "active " : "") +  "ca-year-button'><a href='#' class='ca-button-a'>" + MenuBarTextArr[3]["title"] + "</a></li>";
  t = t + "</ul>";
  $(".ca-button-area").append(t);
}

function SetTopCheckBoxColomn(){
  for(var i=0;i<CheckboxTextArr.length;i++){
    var t = "<label class='checkbox-inline'>";
    if(CheckboxTextArr[i]["flag"]){
      t = t + "<input type='checkbox' class='ca-menu-checkbox' value='" + i + "' checked>" + CheckboxTextArr[i]["title"];
    }else{
      t = t + "<input type='checkbox' class='ca-menu-checkbox' value='" + i + "'>" + CheckboxTextArr[i]["title"];
    }
     
    t = t + "</label>";
    $(".ca-column-checkbox-wrapper").append(t);
  }
}

//グラフの右上のボタン選択
function CaButtonSelect(type){
  var SelectButtonDiv = $(".ca-button-area").children("ul").children("li");
  SelectButtonDiv.removeClass("active");
  if(type == "m"){
    $(".ca-month-button").addClass("active");
	}else if(type == "d"){
    $(".ca-day-button").addClass("active");
  }else if(type == "y"){
    $(".ca-year-button").addClass("active");
  }else if(type == "w"){
    $(".ca-week-button").addClass("active");
  }else if(type == "p"){
    //none
  }
}

//dateを日に変換
function convertDateDayChart(array){
  for(var i=0;i<array.length;i++){
    var d = new Date(array[i][0]);
    array[i][0] = d.getDate();
  }
  return array;
}

//dateを月に変換
function convertDateMonthChart(array){
  for(var i=0;i<array.length;i++){
    var d = new Date(array[i][0]);
    array[i][0] = d.getMonth() + 1;
  }
  return array;
}

//dateを月/日に変換
function convertDateMonthDayChart(array){
  for(var i=0;i<array.length;i++){
    var d = new Date(array[i][0]);
    array[i][0] = (d.getMonth() + 1) + "/" + d.getDate();
  }
  return array;
}

//曜日を付加
function convertYobiChart(array){
  for(var i=0;i<array.length;i++){
    array[i][0] = array[i][0] + "(" + getYobiStr(CurrentDate.getFullYear(), (CurrentDate.getMonth()+1), array[i][0]) + ")";
  }
  return array;
}

//月を付加
function convertTukiChart(array){
  for(var i=0;i<array.length;i++){
    array[i][0] = array[i][0] + "月";
  }
  return array;
}

//選択しているメニューをstrで返す
function SearchIdArrStr(){
  var arr = Array();
  var CalenderSelectBoxMaxId = Math.max.apply(null, CalenderSelectBoxArr);
  for(var i=0;i<CalenderSelectBoxArr.length;i++){
    if(CalenderSelectBoxMaxId != CalenderSelectBoxArr[i]){
     var index = $(".ca-column-area").children(".ca-column-button-wrapper").children("#" + CalenderSelectBoxArr[i]).val();
        arr.push((index - 1));
    }
  }
  return JSON.stringify(arr);
}

//選択しているチェックボックスをstrで返す
function checkedIdArrStr(){
  var arr = Array();
  for(var i=0;i<CheckboxTextArr.length;i++){
    if(CheckboxTextArr[i]["flag"]){
      arr.push(i);	
    }
  }
  return JSON.stringify(arr);
}

//Dateから曜日を返す
function getYobiStr(myY, myM, myD){
  myDate = new Date(myY, myM - 1, myD);
  myWeek = myDate.getDay();
  return DayOfTheWeek[myWeek];
}

//Date日数を計算して返す
function getOfBeforeAfterDays(dateObj, number) {
    var result = false;
    if (dateObj && dateObj.getTime && number && String(number).match(/^-?[0-9]+$/)) {
        result = new Date(dateObj.getTime() + Number(number) * 24 * 60 * 60 * 1000);
    }
    return result;
}

//配列から要素を削除
function removeFindArr(arr,v){
  for(var i=0; i<arr.length; i++){
    if(arr[i] == v){
        arr.splice(i, 1);
    }
  }
  return arr;
}

//グラフを更新する関数
function drawChart(array, type){
  if(type == "w"){
    //日付をdateから日に変換する
    array = convertDateDayChart(array);
    //曜日を付加する
    array = convertYobiChart(array);
  }else if(type == "y"){
    //月を付加する
    array = convertTukiChart(array);
  }else if(type == "p"){
    //日付をdateから月/日に変換する
    array = convertDateMonthDayChart(array);
  }

  // 表示するデータの設定
  var data = new google.visualization.DataTable();
  data.addColumn('string', '日');

  var CalenderSelectBoxMaxId = Math.max.apply(null, CalenderSelectBoxArr);
  for(var i=0;i<CalenderSelectBoxArr.length;i++){
    if(CalenderSelectBoxMaxId != CalenderSelectBoxArr[i]){
      var index = $(".ca-column-area").children(".ca-column-button-wrapper").children("#" + CalenderSelectBoxArr[i]).val();
      data.addColumn('number', SearchTextArr[index - 1]);
    }
  }

  data.addRows(array);

  // グラフの設定
  var option = {
    title: GraphTitle,
    width: '100%',
    height: '100%',
    chartArea: {'width': '90%', 'top':'50','right':'3%','left':'6%','bottom': '70'},
    legend: {'position': 'bottom', alignment: 'start'},
    colors: GraphColors
  };

  option.series = {};
  for(var i=0;i<CalenderSelectBoxArr.length;i++){
    if(CalenderSelectBoxMaxId != CalenderSelectBoxArr[i]){
      option.series[i] = { type: GraphAllTypeArr[GraphTypeIndexArr[i]]};
    }
  }
  var chart = new google.visualization.ComboChart(document.getElementById('chart'));
  chart.draw(data, option);
}

//データを更新する関数
function reloadData(type,PostDataStr){
  chart_data.splice(0, chart_data.length);
  AjaxProc(getchartdata_url,PostDataStr, function(data){
    //グラフに描画
    drawChart(data,type);
  });
}

//Ajax処理をまとめた関数
function AjaxProc(url, postdata, callback){
  //alert(postdata);
	$.ajax({
		url: url,
		type: 'POST',
		data: postdata,
		success: function(data) {
			//alert(data);
			data = JSON.parse(data);
			callback(data);
		}
	});
}