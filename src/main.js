import './index.css';


(function(){
  "use strict";
  var view = document.getElementById('view');
  var sb = document.getElementById('sb');
  var tabbar = document.getElementById('tabbar');
  var app = document.getElementById('app');

  var S = { onboarded:false, screen:'home', name:'', mood:null, slide:0,
            recSeg:'log', cnsSeg:'reco', dark:false, msgs:[], typing:false, entries:[] };

  var MOODS = [
    {k:'great',label:'아주 좋아요',tone:'#3F8A9E',soft:'#D8ECF1',mouth:'M16,33 Q24,42 32,33'},
    {k:'good', label:'좋아요',     tone:'#53A1B6',soft:'#DFEFF1',mouth:'M17,33 Q24,39 31,33'},
    {k:'ok',   label:'그저 그래요', tone:'#7BBCC5',soft:'#EDF6F7',mouth:'M17,34 L31,34'},
    {k:'down', label:'조금 힘들어요',tone:'#E0A07F',soft:'#FBEDE4',mouth:'M17,37 Q24,32 31,37'},
    {k:'bad',  label:'많이 지쳐요', tone:'#FF8E73',soft:'#FFE7E0',mouth:'M16,38 Q24,31 32,38'}
  ];
  function mood(k){ for(var i=0;i<MOODS.length;i++) if(MOODS[i].k===k) return MOODS[i]; return MOODS[2]; }
  function ic(id,cls){ return '<svg class="ic '+(cls||'s24')+'"><use href="#'+id+'"/></svg>'; }
  function icc(id,cls,style){ return '<svg class="ic '+(cls||'s24')+'" style="'+(style||'')+'"><use href="#'+id+'"/></svg>'; }
  function faceSvg(m,size,stroke){ stroke=stroke||'#fff'; return '<svg width="'+(size*0.6)+'" height="'+(size*0.6)+'" viewBox="0 0 48 48" fill="none" stroke="'+stroke+'" stroke-width="3" stroke-linecap="round"><circle cx="18" cy="22" r=".5"/><circle cx="30" cy="22" r=".5"/><path d="'+m.mouth+'"/></svg>'; }
  function statusBar(){ }
  var REPLIES = [
    "그랬군요. 그 마음, 충분히 그럴 수 있어요. 조금 더 들려주실래요?",
    "이야기해줘서 고마워요. 그 순간 가장 크게 느껴진 감정은 무엇이었나요?",
    "혼자 안고 있기엔 무거웠을 것 같아요. 지금은 어떤 마음이 남아 있나요?",
    "그 감정을 흘려보내도 괜찮아요. 잠시 같이 숨을 골라볼까요?"
  ];
  var replyI = 0;

  /* ============ ONBOARDING ============ */
  var SLIDES = [
    {ic:'i-chat', t:'곁에서 조용히\n들어주는 동반자', b:'예약도, 기다림도 없이 지금 바로. 필요한 순간엔 사람 전문가로도 자연스럽게 이어드려요.', tone:['var(--breeze100)','var(--breezeDeep)']},
    {ic:'i-spark',t:'감정은 흐르도록,\n억지로 풀지 않아요', b:'감정을 통제하는 대신 자연스럽게 흘려보내요. 머물러도 괜찮아요.', tone:['var(--mist100)','var(--breezeDeep)']},
    {ic:'i-trend',t:'나만의 마음\n흐름을 발견해요', b:'기록이 쌓이면 나루가 당신만의 감정 패턴을 찾아 다정하게 알려드려요.', tone:['var(--coralSoft)','var(--coralDeep)']}
  ];

  function renderSplash(){
    statusBar(true, 'var(--breeze)'); tabbar.style.display='none';
    view.style.padding='0';
    view.innerHTML =
      '<div class="wave view-anim" style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:44px;padding:48px 32px;background:linear-gradient(160deg,var(--breeze),var(--mist) 72%,var(--breeze50))">'+
        '<div class="inner" style="display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center">'+
          '<img src="'+'/NARU-APP/naru-logo.png'+'" alt="naru" style="width:176px;height:auto;object-fit:contain"/>'+
          '<div class="title" style="font-weight:500;color:rgba(255,255,255,.95)">마음이 흐르는 곳, 나루</div>'+
        '</div>'+
        '<div class="inner" style="width:100%;display:flex;flex-direction:column;gap:12px">'+
          '<button class="btn full" id="b-start" style="background:#fff;color:#2D6B7B">시작하기</button>'+
          '<button class="btn full" id="b-login" style="background:rgba(255,255,255,.18);color:#fff">이미 계정이 있어요</button>'+
        '</div>'+
      '</div>';
    document.getElementById('b-start').onclick=function(){ S.slide=0; renderSlides(); };
    document.getElementById('b-login').onclick=function(){ S.slide=0; renderSlides(); };
  }

  function renderSlides(){
    statusBar(false, 'var(--bg)'); tabbar.style.display='none'; view.style.padding='0';
    var s = SLIDES[S.slide];
    var dots=''; for(var i=0;i<SLIDES.length;i++){ dots+='<span style="height:7px;border-radius:999px;width:'+(i===S.slide?'22px':'7px')+';background:'+(i===S.slide?'var(--breeze)':'var(--border)')+';transition:all .26s"></span>'; }
    view.innerHTML =
      '<div class="view-anim" style="flex:1;display:flex;flex-direction:column;background:var(--bg)">'+
        '<div style="padding:47px 20px 10px;display:flex;justify-content:space-between;align-items:center">'+
          '<div style="display:flex;gap:7px">'+dots+'</div>'+
          '<button class="bodyMm" id="b-skip" style="border:none;background:none;color:var(--text3);cursor:pointer">건너뛰기</button>'+
        '</div>'+
        '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;padding:0 28px">'+
          '<div style="position:relative;width:150px;height:150px;display:grid;place-items:center">'+
            '<span style="position:absolute;inset:0;border-radius:42% 58% 56% 44%/50% 46% 54% 50%;background:'+s.tone[0]+'"></span>'+
            '<span style="position:relative;color:'+s.tone[1]+'">'+icc(s.ic,'','width:56px;height:56px;stroke-width:1.6')+'</span>'+
          '</div>'+
          '<div style="text-align:center"><div class="h2" style="white-space:pre-line;margin-bottom:12px">'+s.t+'</div><div class="bodyL" style="color:var(--text2)">'+s.b+'</div></div>'+
        '</div>'+
        '<div style="padding:0 24px 44px"><button class="btn full" id="b-next">'+(S.slide===SLIDES.length-1?'거의 다 왔어요':'다음')+'</button></div>'+
      '</div>';
    document.getElementById('b-skip').onclick=function(){ renderName(); };
    document.getElementById('b-next').onclick=function(){ if(S.slide<SLIDES.length-1){ S.slide++; renderSlides(); } else renderName(); };
  }

  function renderName(){
    statusBar(false, 'var(--bg)'); tabbar.style.display='none'; view.style.padding='0';
    view.innerHTML =
      '<div class="view-anim" style="flex:1;display:flex;flex-direction:column;background:var(--bg)">'+
        '<div style="padding:47px 20px 8px"><button id="b-back" style="border:none;background:none;cursor:pointer;color:var(--text2)">'+ic('i-left','s24')+'</button></div>'+
        '<div style="flex:1;padding:20px 24px">'+
          '<div class="h2" style="margin-bottom:12px">어떻게 불러드리면<br>좋을까요?</div>'+
          '<div class="bodyL" style="color:var(--text3);margin-bottom:32px">편하게 불릴 이름이나 별명을 알려주세요.</div>'+
          '<input id="nm" placeholder="예) 지민" value="'+(S.name||'')+'" style="width:100%;box-sizing:border-box;border:none;border-bottom:2px solid var(--breeze);padding:10px 2px;font:700 24px/1.3 var(--font);color:var(--text);background:transparent;outline:none"/>'+
        '</div>'+
        '<div style="padding:0 24px 44px"><button class="btn full" id="b-next" disabled>다음</button></div>'+
      '</div>';
    var nm=document.getElementById('nm'), bn=document.getElementById('b-next');
    function sync(){ S.name=nm.value.trim(); bn.disabled=!S.name; }
    nm.oninput=sync; sync(); nm.focus();
    document.getElementById('b-back').onclick=renderSlides;
    bn.onclick=function(){ if(S.name) renderMoodPick(); };
  }

  function renderMoodPick(){
    statusBar(false, 'var(--bg)'); tabbar.style.display='none'; view.style.padding='0';
    var rows='';
    MOODS.forEach(function(m){
      var on = S.mood===m.k;
      var selBg = on ? (S.dark ? m.tone+'33' : m.soft) : 'var(--surface)';
      var selText = on && S.dark ? m.tone : 'var(--text)';
      rows+='<button class="moodbtn pick" data-k="'+m.k+'" style="flex-direction:row;gap:16px;padding:12px 16px;border-radius:16px;border:1px solid '+(on?m.tone:'var(--border)')+';background:'+selBg+';width:100%">'+
        '<span class="mood" style="width:44px;height:44px;background:'+(on?m.tone:(S.dark?m.tone+'30':m.soft))+';'+(on?'box-shadow:0 8px 20px -6px '+m.tone+'88':'')+'">'+faceSvg(m,44,on?'#fff':m.tone)+'</span>'+
        '<span class="bodyL" style="font-weight:600;color:'+selText+'">'+m.label+'</span></button>';
    });
    view.innerHTML =
      '<div class="view-anim" style="flex:1;display:flex;flex-direction:column;background:var(--bg)">'+
        '<div style="flex:1;padding:47px 24px 0">'+
          '<div class="h2" style="margin-bottom:12px">'+S.name+'님, 반가워요.<br>지금 마음은 어떤가요?</div>'+
          '<div class="bodyL" style="color:var(--text3);margin-bottom:32px">첫 마음을 기록하며 나루와 시작해볼까요.</div>'+
          '<div style="display:flex;flex-direction:column;gap:12px">'+rows+'</div>'+
        '</div>'+
        '<div style="padding:20px 24px 44px"><button class="btn full" id="b-go" '+(S.mood?'':'disabled')+'>나루 시작하기</button></div>'+
      '</div>';
    Array.prototype.forEach.call(view.querySelectorAll('.pick'),function(b){ b.onclick=function(){ S.mood=b.getAttribute('data-k'); renderMoodPick(); }; });
    document.getElementById('b-go').onclick=function(){ if(S.mood){ S.onboarded=true; S.checked=true; go('home'); } };
  }

  /* ============ TAB BAR ============ */
  var TABS=[['home','홈','i-home'],['record','기록','i-note'],['chat','대화','i-chat'],['counsel','상담','i-heart'],['profile','마이','i-user']];
  function renderTabs(){
    tabbar.style.display='flex';
    tabbar.innerHTML = TABS.map(function(t){
      var on = S.screen===t[0];
      return '<button class="tab'+(on?' on':'')+'" data-go="'+t[0]+'">'+ic(t[2])+'<span class="lb">'+t[1]+'</span></button>';
    }).join('');
    Array.prototype.forEach.call(tabbar.querySelectorAll('.tab'),function(b){ b.onclick=function(){ go(b.getAttribute('data-go')); }; });
  }

  /* ============ HOME ============ */
  var AFF={great:'좋은 기운이 가득한 하루네요. 그 마음, 천천히 누려도 괜찮아요.',
    good:'잔잔하게 좋은 하루예요. 이 평온함을 가만히 느껴보세요.',
    ok:'그저 그런 날도 소중해요. 무리하지 않아도 괜찮아요.',
    down:'조금 힘든 하루였군요. 그 마음, 흘려보내도 괜찮아요.',
    bad:'많이 지친 하루네요. 오늘은 나에게 가장 다정해도 좋아요.'};
  function careCard(icn,t,sub){ return '<div class="card" style="padding:14px;min-width:148px;flex-shrink:0"><span style="width:38px;height:38px;border-radius:12px;background:var(--breeze50);display:grid;place-items:center;color:var(--breezeDeep);margin-bottom:12px">'+ic(icn,'s20')+'</span><div class="bodyMm">'+t+'</div><div class="cap" style="color:var(--text3);margin-top:3px">'+sub+'</div></div>'; }
  function renderHome(){
    statusBar(true, 'var(--breeze)'); view.style.padding='0';
    var m = mood(S.mood);
    var hr=new Date().getHours();
    var greet = hr<12?'좋은 아침이에요':hr<18?'좋은 오후예요':'편안한 저녁이에요';
    var faces = MOODS.map(function(x){ var on=S.mood===x.k; var cirBg=on?x.tone:(S.dark?x.tone+'30':x.soft);
      return '<button class="moodbtn hmood" data-k="'+x.k+'"><span class="mood" style="width:52px;height:52px;background:'+cirBg+';'+(on?'box-shadow:0 8px 20px -6px '+x.tone+'88;transform:scale(1.06)':'')+'">'+faceSvg(x,52,on?'#fff':x.tone)+'</span><span class="cap" style="color:var(--text3);margin-top:2px">'+x.label.replace(/요$/,'').replace('아주 좋','좋아').slice(0,4)+'</span></button>';
    }).join('');
    var checkin = S.checked ?
      '<div class="card" style="padding:16px">'+
        '<div style="display:flex;align-items:center;gap:14px">'+
          '<span class="mood" style="width:56px;height:56px;background:'+m.tone+'">'+faceSvg(m,56)+'</span>'+
          '<div style="flex:1"><div class="capm" style="color:var(--text3);margin-bottom:4px">오늘의 마음</div><div class="title">'+m.label+'</div></div>'+
          '<button id="h-edit" class="capm" style="border:none;background:none;color:var(--text3);cursor:pointer;padding:6px 4px;flex-shrink:0">다시 고르기</button>'+
        '</div>'+
        '<div class="bodyM" style="color:var(--text2);margin-top:14px;padding-top:14px;border-top:1px solid var(--borderSoft)">'+AFF[S.mood]+'</div>'+
      '</div>' :
      '<div class="card" style="padding:16px">'+
        '<div class="title" style="margin-bottom:4px">오늘 마음은 어떤가요?</div>'+
        '<div class="bodyM" style="color:var(--text3);margin-bottom:18px">지금 이 순간에 가장 가까운 얼굴을 골라주세요.</div>'+
        '<div style="display:flex;justify-content:space-between">'+faces+'</div>'+
      '</div>';
    view.innerHTML =
      '<div class="view-anim">'+
        '<div class="wave"><span class="glow"></span>'+
          '<svg viewBox="0 0 390 200" preserveAspectRatio="none" style="position:absolute;left:0;bottom:-1px;width:100%;height:96px;opacity:.4"><path d="M0,150 C70,110 160,180 250,140 C320,108 360,150 390,128 L390,200 L0,200 Z" fill="rgba(255,255,255,.4)"/></svg>'+
          '<div class="inner" style="padding:47px 20px 76px;display:flex;justify-content:space-between;align-items:flex-start">'+
            '<div><div class="bodyMm" style="color:rgba(255,255,255,.9);margin-bottom:8px">'+greet+'</div><div class="h1" style="color:#fff">'+S.name+'님,<br>오늘도 곁에 있을게요</div></div>'+
            '<button id="h-bell" style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.22);border:none;display:grid;place-items:center;color:#fff;cursor:pointer;position:relative">'+ic('i-bell','s24')+'<span style="position:absolute;top:10px;right:11px;width:8px;height:8px;border-radius:50%;background:var(--coral);border:2px solid var(--breeze)"></span></button>'+
          '</div>'+
        '</div>'+
        '<div style="padding:0 16px 32px;margin-top:-56px;position:relative;display:flex;flex-direction:column;gap:20px">'+
          checkin+
          '<div><div class="title" style="padding:0 4px 12px">오늘의 작은 돌봄</div>'+
            '<div style="display:flex;gap:12px;overflow-x:auto;padding:0 4px 4px">'+
              careCard('i-wind','깊은 호흡','천천히 들이쉬고 내쉬기')+
              careCard('i-cup','따뜻한 차 한 잔','잠시 손을 데우며 쉬기')+
              careCard('i-leaf','짧은 산책','바깥 공기 마시기')+
            '</div></div>'+
          '<button class="card" id="h-ai" style="padding:0;overflow:hidden;border:1px solid var(--borderSoft);cursor:pointer;text-align:left">'+
            '<div style="padding:16px;background:linear-gradient(135deg,var(--breeze50),var(--mist100));display:flex;gap:12px;align-items:center">'+
              '<span style="width:44px;height:44px;border-radius:12px;background:var(--surface);display:grid;place-items:center;box-shadow:var(--shadowSoft);flex-shrink:0;color:var(--breezeDeep)">'+icc('i-chat','','width:22px;height:22px')+'</span>'+
              '<div style="flex:1"><div class="capm" style="color:var(--breezeDeep);margin-bottom:4px">나루의 오늘 질문</div><div class="bodyLm">요즘 잠은 잘 주무세요? 어젯밤은 어땠는지 들려주실래요?</div></div>'+
              icc('i-right','s20','color:var(--breezeDeep);flex-shrink:0')+
            '</div></button>'+
          '<div><div style="display:flex;justify-content:space-between;align-items:center;padding:4px 4px 12px"><span class="title">최근 기록</span><button class="bodyMm" id="h-all" style="border:none;background:none;color:var(--text3);cursor:pointer">전체보기</button></div>'+
            '<div style="display:flex;flex-direction:column;gap:12px">'+
              '<button class="card h-recent" style="padding:12px;display:flex;align-items:center;gap:12px;width:100%;border:1px solid var(--borderSoft);cursor:pointer;text-align:left"><span class="mood" style="width:40px;height:40px;background:#53A1B6">'+faceSvg(mood('good'),40)+'</span><div style="flex:1;min-width:0"><div class="bodyMm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">발표를 무사히 끝냈다. 생각보다 떨지 않아서…</div><div class="cap" style="color:var(--faint);margin-top:4px">오늘 · 오후 2:14</div></div>'+icc('i-right','s20','color:var(--faint)')+'</button>'+
              '<button class="card h-recent" style="padding:12px;display:flex;align-items:center;gap:12px;width:100%;border:1px solid var(--borderSoft);cursor:pointer;text-align:left"><span class="mood" style="width:40px;height:40px;background:#E0A07F">'+faceSvg(mood('down'),40)+'</span><div style="flex:1;min-width:0"><div class="bodyMm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">사람들 사이에서 괜히 작아지는 기분이 들었다…</div><div class="cap" style="color:var(--faint);margin-top:4px">어제 · 밤 11:02</div></div>'+icc('i-right','s20','color:var(--faint)')+'</button>'+
            '</div></div>'+
        '</div>'+
      '</div>';
    document.getElementById('h-bell').onclick=function(){ go('profile'); };
    document.getElementById('h-ai').onclick=function(){ go('chat'); };
    var allBtn=document.getElementById('h-all'); if(allBtn) allBtn.onclick=function(){ S.recSeg='log'; go('record'); };
    Array.prototype.forEach.call(view.querySelectorAll('.h-recent'),function(b){ b.onclick=function(){ S.recSeg='log'; go('record'); }; });
    if(S.checked){
      document.getElementById('h-edit').onclick=function(){ S.checked=false; renderHome(); };
    } else {
      Array.prototype.forEach.call(view.querySelectorAll('.hmood'),function(b){ b.onclick=function(){ S.mood=b.getAttribute('data-k'); S.checked=true; renderHome(); }; });
    }
  }

  /* ============ RECORD ============ */
  function renderRecord(){
    statusBar(false, 'var(--bg)'); view.style.padding='0';
    var seg='<div style="padding:12px 16px 4px"><div class="seg"><button data-seg="log" class="'+(S.recSeg==='log'?'on':'')+'">기록</button><button data-seg="analysis" class="'+(S.recSeg==='analysis'?'on':'')+'">분석</button></div></div>';
    var head='<div style="padding:47px 16px 4px"><div class="capm" style="color:var(--text3);margin-bottom:4px">5월 · 2026</div><div class="h2">마음 기록</div></div>';
    var body = S.recSeg==='log' ? recLog() : recAnalysis();
    view.innerHTML='<div class="view-anim" style="position:relative;min-height:100%">'+head+seg+body+'</div>';
    Array.prototype.forEach.call(view.querySelectorAll('[data-seg]'),function(b){ b.onclick=function(){ S.recSeg=b.getAttribute('data-seg'); renderRecord(); }; });
    var fab=document.getElementById('fab');
    if(S.recSeg==='log'){
      fab.style.display='grid';
      var add=document.getElementById('rec-add'); if(add) add.onclick=showCompose;
    } else { fab.style.display='none'; }
  }

  /* compose bottom sheet */
  function showCompose(){
    var sheetMood='ok', txt='';
    var ov=document.createElement('div');
    ov.style.cssText='position:absolute;inset:0;background:rgba(15,23,42,.4);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);display:flex;align-items:flex-end;z-index:40';
    function faces(){ return MOODS.map(function(x){ var on=sheetMood===x.k; var circleBg=on?x.tone:(S.dark?x.tone+'30':x.soft); var faceCol=on?'#fff':(S.dark?x.tone:x.tone); return '<button class="moodbtn cmf" data-k="'+x.k+'"><span class="mood" style="width:48px;height:48px;background:'+circleBg+';'+(on?'box-shadow:0 8px 18px -6px '+x.tone+'88;transform:scale(1.06)':'')+'">'+faceSvg(x,48,faceCol)+'</span></button>'; }).join(''); }
    function paint(){
      ov.innerHTML='<div style="width:100%;background:var(--surface);border-radius:24px 24px 0 0;padding:12px 20px 28px;animation:up .3s cubic-bezier(.22,1,.36,1)">'+
        '<div style="width:40px;height:5px;border-radius:999px;background:var(--border);margin:0 auto 18px"></div>'+
        '<div class="h3" style="margin-bottom:4px">지금 마음을 남겨볼까요?</div>'+
        '<div class="bodyM" style="color:var(--text3);margin-bottom:16px">가장 가까운 감정을 먼저 골라주세요.</div>'+
        '<div style="display:flex;justify-content:space-between;margin-bottom:16px">'+faces()+'</div>'+
        '<textarea id="c-txt" rows="3" placeholder="오늘 어떤 일이 있었나요? 떠오르는 대로 적어도 괜찮아요." style="width:100%;box-sizing:border-box;border:1px solid var(--border);border-radius:12px;padding:14px;font:400 16px/1.5 var(--font);color:var(--text);background:var(--bgSoft);outline:none;resize:none;margin-bottom:16px">'+txt+'</textarea>'+
        '<div style="display:flex;gap:10px"><button class="btn md outline" id="c-cancel" style="flex-shrink:0">취소</button><button class="btn md" id="c-save" style="flex:1">'+ic('i-check','s18')+'기록 저장하기</button></div>'+
      '</div>';
      Array.prototype.forEach.call(ov.querySelectorAll('.cmf'),function(b){ b.onclick=function(){ sheetMood=b.getAttribute('data-k'); var ta=ov.querySelector('#c-txt'); txt=ta?ta.value:txt; paint(); }; });
      ov.querySelector('#c-cancel').onclick=close;
      ov.querySelector('#c-save').onclick=function(){ var ta=ov.querySelector('#c-txt'); var v=ta.value.trim(); var mm=mood(sheetMood);
        S.entries.unshift({mood:sheetMood,label:mm.label,time:'방금',text:v||'(내용 없이 마음만 남겼어요)',tags:[]});
        close(); S.recSeg='log'; renderRecord(); };
    }
    function close(){ ov.style.animation=''; if(ov.parentNode) ov.parentNode.removeChild(ov); }
    ov.onclick=function(e){ if(e.target===ov) close(); };
    document.querySelector('.phone').appendChild(ov);
    paint();
    var ta=ov.querySelector('#c-txt'); if(ta) ta.focus();
  }
  function dayCell(d,mk,n,today){ var m=mood(mk); return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px 0;border-radius:16px;'+(today?'background:var(--breeze100)':'')+'"><span class="cap" style="color:var(--text3)">'+d+'</span><span class="mood" style="width:26px;height:26px;background:'+m.tone+'">'+faceSvg(m,26)+'</span><span class="bodyMm" style="color:'+(today?'var(--breezeDeep)':'var(--text2)')+';font-weight:'+(today?700:500)+'">'+n+'</span></div>'; }
  function entry(mk,label,time,text,tags){ var m=mood(mk); return '<div class="card" style="padding:16px;margin-bottom:12px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><span class="mood" style="width:36px;height:36px;background:'+m.tone+'">'+faceSvg(m,36)+'</span><div style="flex:1"><div class="bodyMm">'+label+'</div></div><span class="cap" style="color:var(--faint)">'+time+'</span></div><div class="bodyM" style="color:var(--text2);margin-bottom:12px">'+text+'</div><div style="display:flex;gap:8px">'+tags.map(function(t){return '<span class="tag oat">#'+t+'</span>';}).join('')+'</div></div>'; }
  function recLog(){
    var userToday = S.entries.map(function(e){ return entry(e.mood,e.label,e.time,e.text,e.tags); }).join('');
    var addCard = '<button id="rec-add" style="width:100%;display:flex;align-items:center;gap:12px;padding:16px;margin-bottom:16px;border-radius:16px;border:1.5px dashed var(--breeze);background:var(--breeze50);cursor:pointer;text-align:left">'+
      '<span style="width:40px;height:40px;border-radius:12px;background:var(--breeze);display:grid;place-items:center;flex-shrink:0;color:#fff">'+ic('i-pencil','s20')+'</span>'+
      '<div style="flex:1"><div class="bodyMm" style="color:var(--breezeDeep)">오늘의 마음을 기록해보세요</div><div class="cap" style="color:var(--text3);margin-top:2px">떠오르는 대로 적어도 괜찮아요</div></div>'+
      icc('i-plus','s20','color:var(--breezeDeep)')+'</button>';
    return '<div style="display:flex;gap:8px;padding:12px 16px 8px">'+
      dayCell('월','good',22)+dayCell('화','ok',23)+dayCell('수','down',24)+dayCell('목','ok',25)+dayCell('금','great',26)+dayCell('토','good',27)+dayCell('일','good',28,true)+'</div>'+
      '<div style="display:flex;gap:8px;padding:8px 16px 4px;overflow:hidden"><span class="chip on">전체</span><span class="chip">좋았던 날</span><span class="chip">힘들었던 날</span></div>'+
      '<div style="padding:12px 16px 96px">'+addCard+'<div class="bodyMm" style="color:var(--text3);padding:0 4px 12px">오늘 · 5월 28일</div>'+
        userToday+
        entry('good','좋아요','오후 2:14','발표를 무사히 끝냈다. 생각보다 떨지 않아서 다행이었어. 끝나고 나니 몸에 힘이 쭉 빠졌다.',['성취','안도'])+
        entry('ok','그저 그래요','오전 9:02','아침은 그냥 그랬다. 특별히 나쁘지도, 좋지도 않은 하루의 시작.',['일상'])+
        '<div class="bodyMm" style="color:var(--text3);padding:0 4px 12px">어제 · 5월 27일</div>'+
        entry('down','조금 힘들어요','밤 11:02','사람들 사이에서 괜히 작아지는 기분이 들었다. 나루랑 이야기하고 조금 가라앉았다.',['불안','관계'])+
      '</div>';
  }
  function recAnalysis(){
    return '<div style="padding:12px 16px 24px;display:flex;flex-direction:column;gap:16px">'+
      '<div class="card" style="padding:16px"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px"><span class="title">이번 주 마음 흐름</span><span class="cap" style="color:var(--faint)">5월 22 – 28</span></div>'+
        '<svg viewBox="0 0 320 150" style="width:100%;height:auto"><defs><linearGradient id="fa" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#53A1B6" stop-opacity=".34"/><stop offset="100%" stop-color="#7BBCC5" stop-opacity=".02"/></linearGradient></defs>'+
        '<path d="M14 65 C37 65,37 78,60 78 C83 78,83 86,106 86 C133 86,133 88,160 88 C186 88,186 49,212 49 C231 49,231 36,250 36 C271 36,271 52,292 52 L292 136 L14 136 Z" fill="url(#fa)"/>'+
        '<path d="M14 65 C37 65,37 78,60 78 C83 78,83 86,106 86 C133 86,133 88,160 88 C186 88,186 49,212 49 C231 49,231 36,250 36 C271 36,271 52,292 52" fill="none" stroke="#53A1B6" stroke-width="3" stroke-linecap="round"/>'+
        '<g fill="var(--surface)" stroke-width="3"><circle cx="14" cy="65" r="4.5" stroke="#53A1B6"/><circle cx="60" cy="78" r="4.5" stroke="#7BBCC5"/><circle cx="106" cy="86" r="4.5" stroke="#E0A07F"/><circle cx="160" cy="88" r="4.5" stroke="#7BBCC5"/><circle cx="212" cy="49" r="4.5" stroke="#53A1B6"/><circle cx="250" cy="36" r="4.5" stroke="#3F8A9E"/><circle cx="292" cy="52" r="4.5" stroke="#53A1B6"/></g>'+
        '<g fill="currentColor" style="color:var(--faint)" font-family="Pretendard" font-size="11" font-weight="600" text-anchor="middle"><text x="14" y="148">월</text><text x="60" y="148">화</text><text x="106" y="148">수</text><text x="160" y="148">목</text><text x="212" y="148">금</text><text x="250" y="148">토</text><text x="292" y="148">일</text></g></svg></div>'+
      '<div style="padding:4px 4px 0"><span class="title">나루가 발견한 흐름</span></div>'+
      '<div class="card" style="padding:16px;display:flex;gap:12px;align-items:flex-start"><span style="width:40px;height:40px;border-radius:12px;flex-shrink:0;display:grid;place-items:center;background:var(--breeze100);color:var(--breezeDeep)">'+ic('i-moon','s20')+'</span><div><div class="bodyLm" style="margin-bottom:4px">수요일 저녁의 가라앉음</div><div class="bodyM" style="color:var(--text2)">최근 3주간 수요일 저녁마다 마음이 평소보다 낮아지는 경향이 보여요. 미리 가벼운 산책을 계획해보는 건 어떨까요?</div></div></div>'+
    '</div>';
  }

  /* ============ CHAT ============ */
  function msgNode(m){
    var el=document.createElement('div');
    if(m.who==='me'){
      el.style.cssText='align-self:flex-end;max-width:82%;padding:12px 16px;border-radius:20px 20px 6px 20px;background:var(--breeze);color:#fff';
      el.innerHTML='<span class="bodyL">'+m.text+'</span>';
    } else {
      el.style.cssText='align-self:flex-start;display:flex;flex-direction:column;max-width:82%';
      var mem=m.mem?'<span style="display:inline-flex;align-items:center;gap:5px;align-self:flex-start;background:var(--breeze100);color:var(--breezeDeep);padding:5px 10px;border-radius:999px;margin-bottom:4px" class="capm">'+ic('i-spark','s14')+'지난 대화를 기억하고 있어요</span>':'';
      el.innerHTML=mem+'<div style="padding:12px 16px;border-radius:20px 20px 20px 6px;background:var(--surface);border:1px solid var(--borderSoft);box-shadow:var(--shadowSoft)"><span class="bodyL">'+m.text+'</span></div>';
    }
    return el;
  }
  function renderChat(){
    statusBar(true); view.style.padding='0';
    if(S.msgs.length===0){ S.msgs=[
      {who:'naru',text:'안녕하세요, '+S.name+'님. 오늘도 이렇게 마음을 들여다보러 와줘서 고마워요.'},
      {who:'naru',text:'어제는 사람들 사이에서 작아지는 기분이 들었다고 했었죠. 오늘 그 마음은 좀 어떤가요?',mem:true}
    ]; }
    var isInit = !view.querySelector('#chatscroll');
    if(isInit){
      view.innerHTML=
        '<div style="height:100%;display:flex;flex-direction:column;background:linear-gradient(180deg,var(--breeze50) 0%,var(--bg) 32%)">'+
          '<div style="padding:47px 16px 12px;display:flex;align-items:center;gap:12px;background:'+(S.dark?'linear-gradient(160deg,#1A3D4E,#163446)':'linear-gradient(160deg,var(--breeze),var(--mist))')+';position:relative;overflow:hidden;flex-shrink:0">'+
            '<svg viewBox="0 0 390 80" preserveAspectRatio="none" style="position:absolute;left:0;bottom:-1px;width:100%;height:40px;opacity:.4"><path d="M0,50 C90,20 150,70 240,44 C310,24 350,52 390,38 L390,80 L0,80 Z" fill="rgba(255,255,255,.4)"/></svg>'+
            '<span style="width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.9);display:grid;place-items:center;flex-shrink:0;position:relative"><img src="/NARU-APP/naru-symbol.png" style="width:24px;height:20px;object-fit:contain"/></span>'+
            '<div style="flex:1;position:relative"><div class="title" style="color:#fff">나루</div><div style="display:flex;align-items:center;gap:6px;margin-top:2px"><span style="width:6px;height:6px;border-radius:50%;background:#7BD0A8"></span><span class="cap" style="color:rgba(255,255,255,.85)">곁에서 듣고 있어요</span></div></div>'+
          '</div>'+
          '<div id="chatscroll" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:16px">'+
            '<div class="cap" style="text-align:center;color:var(--faint)">오늘 · 오후 9:24</div>'+
          '</div>'+
          '<div style="flex-shrink:0;padding-bottom:8px">'+
            '<div style="display:flex;gap:8px;padding:8px 16px 12px;overflow-x:auto"><button class="chip sug" style="font-weight:500;font-size:13px;padding:9px 14px">아직 좀 무거워요</button><button class="chip sug" style="font-weight:500;font-size:13px;padding:9px 14px">조금 나아졌어요</button><button class="chip sug" style="font-weight:500;font-size:13px;padding:9px 14px">그냥 들어주세요</button></div>'+
            '<div style="padding:0 16px;display:flex;align-items:flex-end;gap:10px">'+
              '<div style="flex:1;min-width:0;display:flex;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:0 18px"><input id="msg" placeholder="마음에 떠오르는 대로 적어보세요" style="flex:1;min-width:0;width:100%;border:none;outline:none;background:transparent;font:400 16px/1.4 var(--font);color:var(--text);padding:14px 0"/></div>'+
              '<button id="send" style="width:48px;height:48px;border-radius:50%;background:var(--breeze);border:none;display:grid;place-items:center;color:#fff;cursor:pointer;flex-shrink:0;box-shadow:0 6px 16px -6px var(--breeze)">'+ic('i-aup','s24')+'</button>'+
            '</div>'+
          '</div>'+
        '</div>';
      S.msgs.forEach(function(m){ document.getElementById('chatscroll').appendChild(msgNode(m)); });
      var inp=document.getElementById('msg'), scroll=document.getElementById('chatscroll');
      function send(text){ text=(text||inp.value).trim(); if(!text||S.typing) return; inp.value=''; S.msgs.push({who:'me',text:text}); S.typing=true;
        scroll.appendChild(msgNode({who:'me',text:text}));
        var typingEl=document.createElement('div'); typingEl.id='typing-indicator';
        typingEl.style.cssText='align-self:flex-start;display:flex;gap:5px;padding:14px 16px;border-radius:20px 20px 20px 6px;background:var(--surface);border:1px solid var(--borderSoft)';
        typingEl.innerHTML='<span style="width:7px;height:7px;border-radius:50%;background:var(--faint);animation:blink 1.2s 0s infinite"></span><span style="width:7px;height:7px;border-radius:50%;background:var(--faint);animation:blink 1.2s .18s infinite"></span><span style="width:7px;height:7px;border-radius:50%;background:var(--faint);animation:blink 1.2s .36s infinite"></span>';
        scroll.appendChild(typingEl); scroll.scrollTop=scroll.scrollHeight;
        setTimeout(function(){ var ti=document.getElementById('typing-indicator'); if(ti) ti.remove();
          S.typing=false; var reply={who:'naru',text:REPLIES[replyI%REPLIES.length]}; replyI++; S.msgs.push(reply);
          scroll.appendChild(msgNode(reply)); scroll.scrollTop=scroll.scrollHeight; },1400); }
      document.getElementById('send').onclick=function(){ send(); };
      inp.onkeydown=function(e){ if(e.key==='Enter') send(); };
      Array.prototype.forEach.call(view.querySelectorAll('.sug'),function(b){ b.onclick=function(){ send(b.textContent); }; });
    }
    var scroll=document.getElementById('chatscroll');
    if(scroll) scroll.scrollTop=scroll.scrollHeight;
  }

  /* ============ COUNSEL ============ */
  var EXPERTS=[
    {name:'이서연',role:'임상심리전문가',years:8,approach:'조급해하지 않아도 괜찮아요. 마음의 속도를 함께 맞춰가요.',rating:'4.9',reviews:128,now:true,format:'화상·채팅'},
    {name:'정현우',role:'상담심리사 1급',years:11,approach:'판단하지 않고, 있는 그대로 들어드릴게요.',rating:'4.8',reviews:94,now:true,tone:'b',format:'화상'},
    {name:'김도윤',role:'정신건강임상심리사',years:6,approach:'작은 변화부터, 일상의 리듬을 함께 회복해요.',rating:'4.9',reviews:61,now:false,soon:'오늘 오후 4시',format:'채팅'}
  ];
  function availTag(c){ return c.now
    ? '<span class="tag mist"><span style="width:6px;height:6px;border-radius:50%;background:#2E8F6B"></span>지금 가능</span>'
    : '<span class="tag neutral">'+c.soon+'</span>'; }
  function counselorRow(c){
    return '<button class="card crow" data-n="'+c.name+'" style="width:100%;padding:14px;display:flex;gap:12px;align-items:center;text-align:left;border:1px solid var(--borderSoft)">'+
      '<span class="av'+(c.tone==='b'?' coral':'')+'" style="width:48px;height:48px">'+c.name.charAt(0)+'</span>'+
      '<div style="flex:1;min-width:0">'+
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span class="bodyLm">'+c.name+'</span>'+availTag(c)+'</div>'+
        '<div class="cap" style="color:var(--text3)">'+c.role+' · '+c.years+'년 · '+c.format+'</div>'+
      '</div>'+
      '<span class="cap" style="color:var(--text3);display:inline-flex;align-items:center;gap:3px;flex-shrink:0;align-self:center"><svg class="ic s14" style="color:#E0A07F"><use href="#i-star"/></svg>'+c.rating+'</span>'+
      icc('i-right','s20','color:var(--faint);flex-shrink:0')+
    '</button>';
  }
  function renderCounsel(){
    statusBar(false, 'var(--bgSoft)'); view.style.padding='0';
    var rec = EXPERTS[0];
    var filter = S.cnsSeg==='now' ? 'now' : 'all';
    var others = EXPERTS.slice(1).filter(function(c){ return filter==='all' || c.now; });
    var listHtml = others.length ? others.map(counselorRow).join('')
      : '<div class="card" style="padding:24px 16px;text-align:center"><div class="bodyM" style="color:var(--text3)">지금 바로 가능한 다른 상담사가 없어요.<br>예약으로 편안하게 만나보실 수 있어요.</div></div>';
    view.innerHTML='<div class="view-anim">'+
      '<div style="padding:47px 16px 4px"><div class="capm" style="color:var(--text3);margin-bottom:4px">전문가 상담</div><div class="h2">마음에 맞는 상담사</div></div>'+
      '<div style="padding:12px 16px 40px;display:flex;flex-direction:column;gap:16px">'+
        '<button class="card" id="c-sum" style="width:100%;padding:14px;display:flex;gap:12px;align-items:center;text-align:left;border:1px solid var(--borderSoft)"><span style="width:40px;height:40px;border-radius:12px;background:var(--breeze50);display:grid;place-items:center;flex-shrink:0;color:var(--breezeDeep)">'+ic('i-msq','s20')+'</span><div style="flex:1"><div class="bodyMm">나루가 기억한 마음, 전문가에게 전하기</div><div class="cap" style="color:var(--text3);margin-top:2px">처음부터 다시 설명하지 않아도 괜찮아요</div></div>'+icc('i-right','s20','color:var(--faint)')+'</button>'+
        /* 나루 추천 — 단일 카드 (그라데이션 밴드/좌측보더 인용박스 제거) */
        '<div class="card" style="padding:16px">'+
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px"><span class="tag">'+ic('i-spark','s14')+'나루 추천</span><span class="cap" style="color:var(--text3);display:inline-flex;align-items:center;gap:3px"><svg class="ic s14" style="color:#E0A07F"><use href="#i-star"/></svg>'+rec.rating+' · 후기 '+rec.reviews+'</span></div>'+
          '<div style="display:flex;gap:14px;align-items:center"><span class="av" style="width:56px;height:56px">'+rec.name.charAt(0)+'</span><div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:8px"><span class="bodyLm">'+rec.name+'</span>'+availTag(rec)+'</div><div class="cap" style="color:var(--text3);margin-top:3px">'+rec.role+' · '+rec.years+'년</div></div></div>'+
          '<div class="bodyM" style="color:var(--text2);margin-top:14px">'+rec.approach+'</div>'+
          '<div class="cap" style="color:var(--text3);margin-top:12px;display:flex;gap:6px;flex-wrap:wrap"><span class="tag oat">'+rec.format+'</span></div>'+

          '<button class="btn md full c-link" data-n="'+rec.name+'" style="margin-top:16px">연결하기</button>'+
        '</div>'+
        /* 다른 상담사 — 깔끔한 리스트 + 가벼운 필터 칩 */
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 4px 0"><span class="title">다른 상담사</span>'+
          '<div style="display:flex;gap:6px"><button class="chip sm-chip'+(filter==='all'?' on':'')+'" data-cs="all">전체</button><button class="chip sm-chip'+(filter==='now'?' on':'')+'" data-cs="now">지금 가능</button></div>'+
        '</div>'+
        listHtml+
        '<div class="card" style="padding:16px;display:flex;gap:12px;align-items:center;background:var(--coralSoft);border-color:transparent"><span style="width:40px;height:40px;border-radius:12px;background:var(--surface);display:grid;place-items:center;flex-shrink:0;color:var(--coralDeep)">'+ic('i-life','s20')+'</span><div style="flex:1"><div class="bodyMm">지금 많이 힘들다면</div><div class="cap" style="color:var(--text2);margin-top:2px">24시간 위기상담 1393 · 즉시 연결</div></div><span style="color:var(--coralDeep)">'+ic('i-phone','s20')+'</span></div>'+
        '<div class="cap" style="text-align:center;color:var(--faint);padding:0 12px">나루의 상담은 의료 행위를 대체하지 않으며, 마음을 정리하고 전문가로 잇는 과정을 돕습니다.</div>'+
      '</div></div>';
    Array.prototype.forEach.call(view.querySelectorAll('[data-cs]'),function(b){ b.onclick=function(){ S.cnsSeg=b.getAttribute('data-cs'); renderCounsel(); }; });
    var sum=document.getElementById('c-sum'); if(sum) sum.onclick=function(){ S.recSeg='analysis'; go('record'); };
  }

  /* ============ PROFILE ============ */
  function renderProfile(){
    statusBar(true, 'var(--breeze)'); view.style.padding='0';
    function row(icn,label,sub,hl){ return '<div class="row"><span class="rowic"'+(hl?' style="background:var(--coralSoft);color:var(--coralDeep)"':'')+'>'+ic(icn,'s20')+'</span><div style="flex:1"><div class="bodyL"'+(hl?' style="color:var(--coralDeep);font-weight:500"':'')+'>'+label+'</div></div>'+(sub?'<span class="bodyM" style="color:var(--faint)">'+sub+'</span>':'')+icc('i-right','s20','color:var(--faint)')+'</div>'; }
    view.innerHTML='<div class="view-anim" style="background:var(--bgSoft);min-height:100%">'+
      '<div class="wave"><span class="glow"></span><div class="inner" style="padding:47px 20px 32px;display:flex;align-items:center;gap:16px">'+
        '<span style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.9);display:grid;place-items:center;flex-shrink:0;box-shadow:0 8px 20px -8px rgba(0,0,0,.25)"><span class="h2" style="color:var(--breezeDeep)">'+S.name.charAt(0)+'</span></span>'+
        '<div style="flex:1"><div class="h3" style="color:#fff">'+S.name+'님</div><div class="bodyMm" style="color:rgba(255,255,255,.9);margin-top:4px">나루와 함께 마음을 들여다보고 있어요</div></div>'+
        '<span style="width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.22);display:grid;place-items:center;color:#fff">'+ic('i-pencil','s20')+'</span>'+
      '</div></div>'+
      '<div style="padding:16px 16px 24px;display:flex;flex-direction:column;gap:16px">'+
        '<div class="card" style="padding:16px;display:flex;gap:14px;align-items:center"><span style="width:46px;height:46px;border-radius:14px;background:var(--breeze50);display:grid;place-items:center;flex-shrink:0;color:var(--breezeDeep)">'+ic('i-spark','s20')+'</span><div style="flex:1"><div class="bodyLm">이번 주, 네 번 곁에 머물렀어요</div><div class="cap" style="color:var(--text3);margin-top:3px">잠시 들렀다 가도, 오래 머물러도 괜찮아요</div></div></div>'+
        '<div><div class="capm" style="color:var(--text3);padding:0 0 8px">마음 관리</div><div class="card" style="overflow:hidden">'+row('i-bell','알림 설정','매일 저녁 9시')+'<div style="height:1px;background:var(--borderSoft);margin:0 16px"></div>'+row('i-target','나의 마음 목표','주 5회 기록')+'</div></div>'+
        '<div><div class="capm" style="color:var(--text3);padding:0 0 8px">앱 설정</div><div class="card" style="overflow:hidden">'+
          '<div class="row" style="cursor:default"><span class="rowic">'+ic('i-moon','s20')+'</span><div style="flex:1" class="bodyL">다크 모드</div><button class="toggle'+(S.dark?'':' off')+'" id="p-dark"><span class="knob"></span></button></div>'+
          '<div style="height:1px;background:var(--borderSoft);margin:0 16px"></div>'+row('i-lock','잠금 & 개인정보')+'</div></div>'+
        '<div><div class="capm" style="color:var(--text3);padding:0 0 8px">지원</div><div class="card" style="overflow:hidden">'+row('i-life','도움이 필요할 때','긴급 상담 연결',true)+'</div></div>'+
        '<button id="p-reset" style="border:none;background:none;color:var(--faint);cursor:pointer;padding:8px 0" class="bodyMm">온보딩 다시 보기</button>'+
        '<div class="cap" style="text-align:center;color:var(--faint)">마음이 흐르는 곳, 나루 · v1.0.0</div>'+
      '</div></div>';
    document.getElementById('p-dark').onclick=function(){ S.dark=!S.dark; app.className=S.dark?'dark':''; document.body.className=S.dark?'dark':''; renderProfile(); };
    document.getElementById('p-reset').onclick=function(){ S.onboarded=false; S.checked=false; S.reflect=false; S.mood=null; S.msgs=[]; renderSplash(); };
  }

  /* ============ ROUTER ============ */
  var RENDER={home:renderHome,record:renderRecord,chat:renderChat,counsel:renderCounsel,profile:renderProfile};
  function go(screen){ S.screen=screen; document.getElementById('fab').style.display='none'; view.onscroll=null; view.style.overflowY = (screen==='chat') ? 'hidden' : 'auto'; if(view.scrollTo) view.scrollTo(0,0); else view.scrollTop=0; RENDER[screen](); renderTabs(); }
  window.naruGo = go; // for testing
  window.__seed = function(o){ Object.assign(S, o); if(o.dark!==undefined) app.className=S.dark?'dark':''; }; // for screenshots
  window.__screen = { splash:renderSplash, slides:renderSlides, name:renderName, moods:renderMoodPick }; // for screenshots

  // boot
  var stage=document.getElementById('stage');
  function fitPhone(){ var pad=20; var s=Math.min((window.innerHeight-pad)/844,(window.innerWidth-pad)/390); if(s>1.18)s=1.18; stage.style.transform='scale('+s+')'; stage.style.transformOrigin='center center'; }
  window.addEventListener('resize',fitPhone); fitPhone();
  document.getElementById('fab').onclick=showCompose;
  if(S.onboarded) go('home'); else renderSplash();
})();
