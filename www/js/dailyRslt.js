var showDialog = function(id){
//    alert("OK");
    app.slidingMenu.setMainPage('page2.html', {closeMenu: true});


};

document.addEventListener("pageinit", function(e) {
  if (e.target.id == "my-page") {
//    document.getElementById("my-content").innerHTML = "Item A<br>";
        makeDailyTbl();
        
  }else if(e.target.id == "detailPage")
  {
        var page = dailyNavi.getCurrentPage();
//alert(page.options.param1.date);
        makeDetailTbl(page.options.param1);
  }
  else if(e.target.id == "period-page")
  {
      makeRankTbl();
  }
}, false);

// 成績表画面作成 //
function makeRankDisplay(rankRslt)
{
        var onsList = document.getElementById('rank-list');
        var onsListItem = document.createElement("rank-list");
        onsListItem.innerHTML = "<table  border='1' cellspacing='0'>"+
                                "<tr>" +
                                "<th width='30'>No</th>" +
                                "<th width='60'>会員名</th>" +
                                "<th width='30'>pt</th>" +
                                "<th width='40'>game</th>" +
                                "<th width='40'>grs</th>" +
                                "<th width='30'>win</th>" +
                                "<th width='40'>Net</th>" +
                                "</tr>"+
                                "</table>";
        onsList.appendChild(onsListItem);
        ons.compile(onsListItem);
        
        for( var i = 0; i< rankRslt.length; i++ )
        {
            var gross = (rankRslt[i].gamePt/rankRslt[i].gameNum).toFixed(2);
            var a_net = ((+gross) + (+rankRslt[i].HDCP)).toFixed(2);
            var no;
            if(i<rankRslt.validNum)
            {
                no=i+1;
            }
            else
            {
                no="";
            }
//            alert();
            onsListItem = document.createElement("rank-list");
            onsListItem.innerHTML =  "<table  border='1' cellspacing='0'>"+
                                "<tr>" +
                                "<th width='30'>"+ no +"</th>" +
                                "<th width='60'>"+ rankRslt[i].name +"</th>" +
                                "<th width='30'>"+ rankRslt[i].gamePt +"</th>" +
                                "<th width='40'>"+ rankRslt[i].gameNum +"</th>" +
                                "<th width='40'>"+ gross +"</th>" +
                                "<th width='30'>"+ rankRslt[i].winNum +"</th>" +
                                "<th width='40'>"+ a_net +"</th>" +
                                "</tr>" +
                                "</table>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
        }
                                
}


/* 日毎マスター画面作成 */
function makeDailyMasterDisplay(dailyRslt)
{
        var onsList = document.getElementById('ons-list');
        for( var i = 0; i< dailyRslt.length; i++ )
        {
            var onsListItem = document.createElement("ons-list");
            onsListItem.innerHTML = "<ons-row id = dailyRow"+i+">" +
                                        "<ons-col>"+
                                            "<header>"+dailyRslt[i].date
                                                    +" 試合数："
                                                    +dailyRslt[i].gameNum
                                                    +
                                            "</header>"+
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
        }
        
        for( var i = 0; i< dailyRslt.length; i++ )
        {
            (function (n) {
                $("#dailyRow" + i).click(function(){
                    goToDailyDetailDisplay(dailyRslt[n]);
                });
            })(i);
        }
    
}

/* 詳細画面へ移行 */
function goToDailyDetailDisplay(rslt)
{
//    alert(rslt.date);
    var options = {param1: rslt};
    dailyNavi.pushPage("page3.html", options);
}

/* 詳細画面作成 */
function makeDetailDisplay(detailRslt)
{
//  alert("a" + detailRslt.count);
    var name = ["","","",""];
    var gamePt = [0,0,0,0];
    var onsListItem;
    

    var onsList = document.getElementById('detail-list');
    onsListItem = document.createElement("detail-list");
    
            onsListItem.innerHTML = "<ons-row>" +
                                        "<ons-col>"+
                                            "<header>"+detailRslt[0].date; +
                                            "</header>" +
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
    
    for( var i = 0; i< detailRslt.length; i++ )
    {
        if(detailRslt[i].row != null)
        {
            name[detailRslt[i].row] = get_NameFromID(detailRslt[i].ID);
            gamePt[detailRslt[i].row] = detailRslt[i].gamePt;
        }
        else
        {
            switch(+(detailRslt[i].serveTurn))
            {
                case 1:
                    name[0] = get_NameFromID(detailRslt[i].ID);
                    gamePt[0] = detailRslt[i].gamePt;
                    break;
                case 2:
                    name[2] = get_NameFromID(detailRslt[i].ID);
                    gamePt[2] = detailRslt[i].gamePt;
                    break;
                case 3:
                    name[1] = get_NameFromID(detailRslt[i].ID);
                    gamePt[1] = detailRslt[i].gamePt;
                    break;
                case 4:
                    name[3] = get_NameFromID(detailRslt[i].ID);
                    gamePt[3] = detailRslt[i].gamePt;
                    break;
            }
        }
        
        /* 4データで１ゲーム分の記述 */
        if(i%4 == 3)
        {
            onsListItem = document.createElement("detail-list");
            onsListItem.innerHTML = "<ons-row>" +
                                        "<ons-col>"+
                                            "<header>"+"NO." + (i+1)/4 +
                                            "</header>" +
                                            "<header>"+"上段ゲーム数 = "
                                                    +gamePt[0]
                                                    + " |" 
                                                    +name[0]+"さん,"
                                                    +name[1]+"さん" +
                                            "</header>"+
                                            "<header>" +"下段ゲーム数 = "
                                                    +gamePt[2]
                                                    + " |" 
                                                    +name[2]+"さん,"
                                                    +name[3]+"さん"
                                            "</header>"+
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
        }
    }
}