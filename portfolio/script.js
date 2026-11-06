(function(){
  var menu=document.getElementById('menu'), links=document.getElementById('links');
  menu.addEventListener('click',function(){var o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o);});
  links.addEventListener('click',function(e){if(e.target.tagName==='A'){links.classList.remove('open');menu.setAttribute('aria-expanded',false);}});

  var hdr=document.querySelector('header');
  function onScroll(){hdr.classList.toggle('scrolled',window.scrollY>10);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var anchors=[].slice.call(links.querySelectorAll('a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){anchors.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id);});}
    });},{rootMargin:'-45% 0px -50% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s){io.observe(s);});
  }

  // highlight the chosen skill card
  var cards=[].slice.call(document.querySelectorAll('.card'));
  function pick(c){cards.forEach(function(x){x.classList.toggle('on',x===c);});}
  cards.forEach(function(c){
    c.addEventListener('click',function(){pick(c);});
    c.addEventListener('mouseenter',function(){pick(c);});
    c.addEventListener('focus',function(){pick(c);});
  });

  // add a photo (shown on this device only)
  var btn=document.getElementById('photoBtn'), inp=document.getElementById('photoIn');
  btn.addEventListener('click',function(){inp.click();});
  inp.addEventListener('click',function(e){e.stopPropagation();});
  inp.addEventListener('change',function(){
    var f=inp.files&&inp.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(){
      var old=btn.querySelector('img'); if(old) old.remove();
      var img=new Image(); img.alt='Photo of Zhekinah'; img.src=r.result;
      btn.insertBefore(img,btn.firstChild); btn.classList.add('has');
      var ab=document.querySelector('#about .blob');
      if(ab&&!ab.querySelector('img')){var i2=new Image();i2.alt='';i2.src=r.result;ab.insertBefore(i2,ab.firstChild);}
    };
    r.readAsDataURL(f);
  });

  var toast=document.getElementById('toast');
  document.getElementById('copy').addEventListener('click',function(){
    var mail='zhekinahgiahfeliciano@gmail.com';
    function done(m){toast.textContent=m;setTimeout(function(){toast.textContent='';},2500);}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(mail).then(function(){done('Email copied');},function(){done(mail);});}
    else{done(mail);}
  });
  document.getElementById('yr').textContent=new Date().getFullYear();
})();
