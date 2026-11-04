/* Acumen website — rendering, 5-language switch, motion, forms. */
const LC=LANGS.map(x=>x[0]),RTL=['ar','ur'];
let lang='en';try{const s=localStorage.getItem('acumen-evolve-lang');if(LC.includes(s))lang=s}catch(e){}
try{const q=(new URLSearchParams(location.search).get('lang')||'').toLowerCase();if(LC.includes(q))lang=q}catch(e){}
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])).replace(/(Deep Research|Command Center|Media Digest|Acumen AI)/g,'<bdi class="pn">$1</bdi>');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function apply(){const r=document.documentElement;r.lang=lang;r.dir=RTL.includes(lang)?'rtl':'ltr';const D=T[lang];document.title=D.metaT;$$('[data-al]').forEach(e=>e.setAttribute('aria-label',D[e.dataset.al]));$('.logo').setAttribute('aria-label',D.brand);{const md=document.querySelector('meta[name=description]');md&&md.setAttribute('content',D.metaD)}$('#rcImg').src=LIMG('research');const AU=k=>`url("${new URL(LIMG(k),document.baseURI).href}")`;r.style.setProperty('--img-gov',AU('government'));r.style.setProperty('--img-city',AU('city'));
 $$('[data-i]').forEach(e=>{const v=D[e.dataset.i];if(v!=null)e.innerHTML=esc(v)});
 $$('[data-alt]').forEach(e=>e.alt=D[e.dataset.alt]);
 $('#langCur').textContent=LANGS.find(x=>x[0]===lang)[1];$('#lang').setAttribute('aria-label',D.langL+': '+LANGS.find(x=>x[0]===lang)[1]);const LO=LANGS.map(([c,n,d])=>`<button class="lopt" type="button" data-l="${c}" lang="${c}" dir="${d}"${c===lang?' aria-current="true"':''}>${n}</button>`);$('#lmenu').innerHTML=LO.map(b=>`<li>${b}</li>`).join('');$('#lmenu').setAttribute('aria-label',D.langL);$('#dlang').innerHTML=LO.join('');$('#dlang').setAttribute('aria-label',D.langL);$('#menu').setAttribute('aria-label',D.menu);
 const [sw,spos]=SINCE[lang],bef=spos==='before',sws=`<span style="font-weight:400;font-size:.62em;opacity:.85">${sw}</span>`,gl=(spos==='after'&&lang==='tr')?'':' ';
 $('#hstats').innerHTML=HST[lang].map(([n,_,suf],i)=>{const fin=(i===0?n:(+n.replace(/,/g,'')).toLocaleString(LOC[lang]))+suf,srT=i===0?(bef?sw+' '+n:n+gl+sw):fin;return `<div><span class="sr">${esc(srT)} ${esc(HSTL[lang][i])}</span><b class="num${i===0?' hs':''}" aria-hidden="true">${i===0&&bef?sws+' ':''}<bdi dir="ltr"><span class="cnt" data-to="${n}">${i===0?n:'0'}</span>${esc(suf).replace('+','<i class="pl">+</i>')}</bdi>${i===0&&!bef?gl+sws:''}</b><span aria-hidden="true">${esc(HSTL[lang][i])}</span></div>`}).join('');
 $('#pillars').innerHTML=PIL[lang].map(([h,p],i)=>`<div class="p4 rv"><div class="ph"><img src="${i===2?LIMG('analysts'):'assets/img/'+PPH[i]}" alt="" loading="lazy"></div><span class="no num">0${i+1}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('');
 $('#mcard').innerHTML=MON[lang].map(([k,h,f,p])=>`<div class="mitem">${MI[k]}<h3>${esc(h)}</h3><span class="fig">${esc(f)}</span><p>${esc(p)}</p><a class="more" href="https://acumen.me/monitoring/"><span>${esc(D.learn)}</span>${ARR}</a></div>`).join('');
 $('#diff').innerHTML=DIFF[lang].map(([k,h,p])=>`<div class="dcell">${SVG(DI[k],'',1.4)}<h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('');
 renderPlat();renderAI();
 $('#tiles').innerHTML=SOL[lang].map(([k,h,p],i)=>`<a class="tile t${i+1}" href="https://acumen.me/solutions/">${SVG(TI[k])}<span class="tag">${esc(TAG[lang][i])}</span><h3>${esc(h)}</h3><p>${esc(p)}</p><span class="go">${esc(D.learn)} ${ARR}</span></a>`).join('');
 $('#flow').innerHTML=FLOW[lang].map(([k,h],i)=>`<div class="fstep"><span class="dot">${SVG(FI[k],'',1.5)}</span><span class="k num">0${i+1}</span><h3>${esc(h)}</h3></div>`).join('');
 $('#rlist').innerHTML=RT[lang].map(([t,d])=>`<div><b><i></i>${esc(t)}</b><span>${esc(d)}</span></div>`).join('');
 $('#ins').innerHTML=INS[lang].map(([ty,h,p,v])=>`<a class="icard" href="${v==='img'?'https://acumen.me/media-digest/':'https://acumen.me/resources/'}"><div class="im">${v==='img'?'<img src="assets/img/digest.jpg" alt="" loading="lazy" decoding="async">':v==='rep'?`<div class="cover"><img src="assets/img/acumen_logo_white.png" alt=""><div><small>${COV[lang][0]}</small><br><b>${COV[lang][1]}</b></div><div class="bars"><i style="height:40%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:85%"></i><i style="height:70%"></i><i style="height:100%"></i></div></div>`:`<img src="${LIMG('city')}" alt="">`}</div><div class="bd"><span class="ty">${esc(ty)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p><span class="more"><span>${esc(D.learn)}</span>${ARR}</span></div></a>`).join('');
 renderArch();
 const F=FOOT[lang];const FL={f1:['https://acumen.me/solutions/'],f2:['https://acumen.me/monitoring/'],f3:['https://acumen.me/solutions/'],f4:['https://acumen.me/about/','https://acumen.me/about/','https://acumen.me/about/','https://acumen.me/contact/'],f5:['https://acumen.me/media-digest/','https://acumen.me/resources/','https://acumen.me/resources/','https://acumen.me/resources/']};['f1','f2','f3','f4','f5'].forEach(k=>$('#'+k).innerHTML=F[k].map((x,i)=>`<a href="${FL[k][i]||FL[k][0]}">${esc(x)}</a>`).join(''));
 try{localStorage.setItem('acumen-evolve-lang',lang)}catch(e){}
 const tc=([m,c,t,sm,d])=>`<div class="tcard"><span class="m" style="background:${c}">${esc(m)}</span><div style="min-width:0"><b lang="ar" dir="rtl">${esc(t)}</b><small dir="${RTL.includes(lang)?'rtl':'ltr'}">${esc(sm)}</small></div><span class="s"></span></div>`.replace('<span class="s"></span>',`<span class="s" style="background:${d}"></span>`);
 {const [lv,its]=LV[lang],one=its.map(([k,l,v])=>`<span class="li">${LI(PI[k])}<span>${esc(l)}</span><b>${esc(v)}</b></span>`).join('');$('#lvLbl b').textContent=lv;$('#lpause').setAttribute('aria-label',T[lang].pauseL);$('#trk').innerHTML=`<div class="lgrp">${one}</div><div class="lgrp" aria-hidden="true">${one}</div>`;$('#ticker').setAttribute('aria-label',lv);}
 reveal();countUp();onScroll&&onScroll()}
const fmtN=(v,yr)=>yr?String(v):v.toLocaleString(LOC[lang]);
function runCnt(el){const to=el.dataset.to,yr=/^(19|20)\d\d$/.test(to),n=+to.replace(/,/g,''),s0=yr?1950:0;cancelAnimationFrame(el._raf);if(RM){el.textContent=fmtN(n,yr);return}
 const t0=performance.now(),d=yr?1600:1800;const f=t=>{const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);el.textContent=fmtN(Math.round(s0+(n-s0)*e),yr);if(k<1)el._raf=requestAnimationFrame(f)};el._raf=requestAnimationFrame(f)}
function resetCnt(el){const to=el.dataset.to,yr=/^(19|20)\d\d$/.test(to);cancelAnimationFrame(el._raf);el.textContent=yr?'1950':'0'}
let cntIO;function countUp(){const box=$('#hstats');const els=$$('#hstats .cnt');if(RM||!('IntersectionObserver' in window)){els.forEach(runCnt);return}
 els.forEach(resetCnt);if(cntIO)cntIO.disconnect();cntIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)els.forEach(runCnt);else els.forEach(resetCnt)}),{threshold:.35});cntIO.observe(box)}
let rvIO;function reveal(){const els=$$('.rv:not(.in)');if(RM||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
 if(!rvIO)rvIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvIO.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});els.forEach(e=>rvIO.observe(e))}
const hdr=$('#hdr');const prog=$('#prog');const onScroll=()=>{hdr.classList.toggle('solid',scrollY>40||$('#drawer').classList.contains('open'));const m=document.documentElement.scrollHeight-innerHeight;prog.style.transform='scaleX('+(m>0?scrollY/m:0)+')';const rl=document.getElementById('tl');if(rl){const r=rl.getBoundingClientRect(),v=innerHeight*.6;rl.style.setProperty('--p',Math.max(0,Math.min(1,(v-r.top)/r.height)).toFixed(3))}};addEventListener('scroll',onScroll,{passive:true});onScroll();
const lm=$('#lmenu'),lb=$('#lang');const closeL=()=>{lm.classList.remove('open');lb.setAttribute('aria-expanded','false')};
lb.addEventListener('click',e=>{e.stopPropagation();const o=lm.classList.toggle('open');lb.setAttribute('aria-expanded',o);if(o&&e.detail===0){const c=lm.querySelector('[aria-current]')||lm.querySelector('.lopt');c&&c.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.lsw'))closeL()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lm.classList.contains('open')){closeL();lb.focus()}});
lm.addEventListener('keydown',e=>{if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;e.preventDefault();const b=[...lm.querySelectorAll('.lopt')],i=b.indexOf(document.activeElement);b[(i+(e.key==='ArrowDown'?1:-1)+b.length)%b.length].focus()});
const pickL=e=>{const b=e.target.closest('.lopt');if(!b)return;lang=b.dataset.l;closeL();apply();try{const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u)}catch(_){}if(e.currentTarget===lm)lb.focus()};
lm.addEventListener('click',pickL);$('#dlang').addEventListener('click',e=>{pickL(e);$('#drawer').classList.remove('open');$('#menu').setAttribute('aria-expanded',false);onScroll()});
$('#menu').addEventListener('click',()=>{const d=$('#drawer');{const hh=Math.ceil(hdr.getBoundingClientRect().bottom);d.style.top=hh+'px';d.style.maxHeight=(innerHeight-hh)+'px'}const o=d.classList.toggle('open');$('#menu').setAttribute('aria-expanded',o);onScroll();if(o){const f=d.querySelector('a');f&&f.focus()}});
new MutationObserver(()=>document.documentElement.classList.toggle('dr-open',$('#drawer').classList.contains('open'))).observe($('#drawer'),{attributes:true,attributeFilter:['class']});
$('#drawer').addEventListener('focusout',e=>{const d=$('#drawer');if(d.classList.contains('open')&&e.relatedTarget&&!d.contains(e.relatedTarget)&&e.relatedTarget!==$('#menu')){d.classList.remove('open');$('#menu').setAttribute('aria-expanded',false);onScroll()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#drawer').classList.contains('open')){$('#drawer').classList.remove('open');$('#menu').setAttribute('aria-expanded',false);onScroll();$('#menu').focus()}});
addEventListener('resize',()=>{if(innerWidth>1280&&$('#drawer').classList.contains('open')){$('#drawer').classList.remove('open');$('#menu').setAttribute('aria-expanded',false);onScroll()}});
$$('#drawer a').forEach(a=>a.addEventListener('click',()=>{$('#drawer').classList.remove('open');$('#menu').setAttribute('aria-expanded',false);onScroll()}));
$('#dform').addEventListener('submit',e=>{e.preventDefault();const i=e.target.querySelector('input');if(!/^\S+@\S+\.\S+$/.test(i.value)){i.setAttribute('aria-invalid','true');i.style.borderColor='#C0392B';$('#dErr').hidden=false;i.focus();return}i.removeAttribute('aria-invalid');i.style.borderColor='';$('#dErr').hidden=true;$('#dok').style.display='block'});
if(RM){const v=$('#vid');v.pause();v.removeAttribute('autoplay')}
/* ===== Ideas adapted from the Immersive handoff: convergence field, archive time-travel, platform tabs, Acumen AI ===== */
const clampN=(v,a,b)=>Math.max(a,Math.min(b,v));
/* platform: tabs + illustrative mock */
let pti=0,ptTimer=null,ptUser=false,platHold=false;
function setTab(i,focus){pti=i;{const pp=$('#ppanel'),t=$$('#ptabs .ptab')[i];if(pp&&t){if(!t.id)t.id='ptab'+i;pp.setAttribute('aria-labelledby',t.id)}}$$('#ptabs .ptab').forEach((b,j)=>{b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1;if(j===i&&focus)b.focus()});$$('#mock .scr').forEach((x,j)=>x.classList.toggle('on',j===i));$$('#mock .rail span').forEach((x,j)=>x.classList.toggle('on',j===i))}
function renderPlat(){const M=MK[lang],TB=PTAB[lang],ic=['feed','search','dash','bell'];
 $('#ptabs').innerHTML=TB.map(([h,d],i)=>`<button class="ptab" type="button" role="tab" id="pt${i}" aria-controls="ppanel">${LI(PI[ic[i]])}<span><b>${esc(h)}</b><small>${esc(d)}</small></span></button>`).join('');
 $('#ptabs').setAttribute('aria-label',T[lang].n1);
 const src=['feed','tv','globe','msg','radio','yt'],sc=['#14A37F','#8A96A6','#D64545','#14A37F','#8A96A6','#14A37F'];
 const feed=src.map((k,i)=>`<div class="frow"><span class="s">${LI(PI[k])}</span><div class="skg"><div class="sk l" style="width:${60+((i*37)%30)}%"></div><div class="sk" style="width:${35+((i*23)%25)}%"></div></div><span class="dot" style="background:${sc[i]}"></span></div>`).join('');
 const bars=[6,8,7,10,12,11,14,13,18,22,20,26,24,30,34,32,38,44,40,48,54,50,58,62,60,70,76,82].map(h=>`<i style="height:${h}%;opacity:${(.4+h/160).toFixed(2)}"></i>`).join('');
 const AL=[['up','#C77A10'],['down','#D64545'],['award','#0083C1'],['act','#7B61D9'],['siren','#D64545']];
 $('#mock').setAttribute('aria-label',T[lang].tAlt);
 $('#mock').innerHTML=`<div class="tb"><span class="d"><i></i><i></i><i></i></span><span class="a">app.acumen.me</span><span class="chip live">${LI(PI.radio)}${esc(M.live)}</span></div>
 <div class="bd"><div class="rail">${['feed','search','dash','bell','report','spark'].map((k,i)=>`<span class="${i===pti?'on':''}">${LI(PI[k])}</span>`).join('')}</div><div class="main">
 <div class="scr"><div class="chips">${M.chips.map(c=>`<span class="chip">${esc(c)}</span>`).join('')}</div><div class="mk">${feed}</div><div class="mfoot"><span>${esc(M.foot)}</span><span class="chip pos">${esc(M.sent)}</span></div></div>
 <div class="scr"><div class="sbar">${LI(PI.search)}<span>"topic" <span class="op">AND</span> (sector <span class="op">OR</span> region) <span class="op">NOT</span> sports</span></div><div class="chips">${M.sch.map(c=>`<span class="chip">${esc(c)}</span>`).join('')}</div><div class="mk"><div class="mlbl"><span>${esc(M.rot)}</span><em>${esc(M.rotS)}</em></div><div class="sbars">${bars}</div></div><div><span class="chip">${LI(PI.bell)}${esc(M.alertMe)}</span></div></div>
 <div class="scr"><div class="mk"><div class="mlbl"><span>${esc(M.vol)}</span><em>${esc(M.volS)}</em></div><svg class="area" viewBox="0 0 420 120" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0083C1" stop-opacity=".35"/><stop offset="1" stop-color="#0083C1" stop-opacity="0"/></linearGradient></defs><g stroke="#EDF0F3"><line x1="0" x2="420" y1="30" y2="30"/><line x1="0" x2="420" y1="60" y2="60"/><line x1="0" x2="420" y1="90" y2="90"/></g><path d="M0 92 C30 88 50 80 80 84 S130 70 160 72 S210 58 240 64 S280 30 300 22 S340 48 370 44 S400 38 420 34 L420 120 L0 120Z" fill="url(#ga)"/><path d="M0 92 C30 88 50 80 80 84 S130 70 160 72 S210 58 240 64 S280 30 300 22 S340 48 370 44 S400 38 420 34" fill="none" stroke="#0083C1" stroke-width="2"/><path d="M0 104 C40 100 70 98 100 100 S160 92 200 94 S260 84 300 80 S360 86 420 76" fill="none" stroke="#575756" stroke-width="1.5" stroke-dasharray="3 3"/></svg></div>
 <div class="g2"><div class="mk"><div class="mlbl"><span>${esc(M.sent)}</span></div><div class="sbar3"><i style="flex:5;background:#14A37F"></i><i style="flex:3;background:#8A96A6"></i><i style="flex:2;background:#D64545"></i></div><div class="legend">${M.pn.map((t,i)=>`<span><i style="background:${['#14A37F','#8A96A6','#D64545'][i]}"></i>${esc(t)}</span>`).join('')}</div></div>
 <div class="mk"><div class="mlbl"><span>${esc(M.sov)}</span></div><div class="sov"><svg viewBox="0 0 36 36" width="54" height="54" aria-hidden="true"><circle cx="18" cy="18" r="14" fill="none" stroke="#DDE3E8" stroke-width="6"/><circle cx="18" cy="18" r="14" fill="none" stroke="#0083C1" stroke-width="6" stroke-dasharray="38 88" transform="rotate(-90 18 18)"/><circle cx="18" cy="18" r="14" fill="none" stroke="#575756" stroke-width="6" stroke-dasharray="22 88" stroke-dashoffset="-38" transform="rotate(-90 18 18)"/><circle cx="18" cy="18" r="14" fill="none" stroke="#9FCDE6" stroke-width="6" stroke-dasharray="14 88" stroke-dashoffset="-60" transform="rotate(-90 18 18)"/></svg><div class="skg"><div class="sk l" style="width:80%"></div><div class="sk" style="width:60%"></div><div class="sk" style="width:45%"></div></div></div></div></div></div>
 <div class="scr"><div class="mlbl"><span>${esc(M.al)}</span><em>${esc(M.alS)}</em></div>${M.AL.map((t,i)=>`<div class="mk alrow"><span class="ai-ic" style="background:${AL[i][1]}1f;color:${AL[i][1]}">${LI(PI[AL[i][0]])}</span><div class="skg" style="flex:1"><b>${esc(t)}</b><div class="sk" style="width:50%"></div></div>${LI(PI.mail)}${LI(PI.msg)}</div>`).join('')}</div>
 </div></div>`;
 setTab(pti,false);
 $$('#ptabs .ptab').forEach((b,i)=>b.addEventListener('click',()=>{ptUser=true;clearInterval(ptTimer);setTab(i,false)}));
 $('#ptabs').onkeydown=e=>{const n=PTAB[lang].length,k=e.key,rtl=RTL.includes(lang);let d=0;if(k==='ArrowDown'||k===(rtl?'ArrowLeft':'ArrowRight'))d=1;if(k==='ArrowUp'||k===(rtl?'ArrowRight':'ArrowLeft'))d=-1;if(!d)return;e.preventDefault();ptUser=true;clearInterval(ptTimer);setTab((pti+d+n)%n,true)};
}
function platAuto(){if(RM||ptUser||platHold)return;clearInterval(ptTimer);ptTimer=setInterval(()=>{if(!ptUser)setTab((pti+1)%4,false)},4500)}
/* Acumen AI: typing prompt + orbit */
let chatSeen=false,typeT=0;
function typeChat(){const q=T[lang].aiQ,el=$('#typed'),ans=$('#ans');clearTimeout(typeT);ans.classList.remove('on');
 if(RM){el.textContent=q;ans.classList.add('on');return}
 let i=0;el.textContent='';(function t(){el.textContent=q.slice(0,++i);if(i<q.length)typeT=setTimeout(t,22+Math.random()*30);else typeT=setTimeout(()=>ans.classList.add('on'),450)})()}
function renderAI(){const D=T[lang];$('#aiC1').innerHTML=LI(PI.chat)+esc(D.aiC1);$('#aiC2').innerHTML=LI(PI.file)+esc(D.aiC2);$('#aiCtl').innerHTML=LI(PI.sliders)+`<span>${esc(D.aiCtl)}</span>`;$('#avIc').innerHTML=LI(PI.spark);
 const ic=['filter','lang','align','scale','cap','tree'];
 $('#agents').innerHTML=AGN[lang].map((a,i)=>{const ang=i/6*Math.PI*2-Math.PI/2;return `<div class="agent" style="--ax:${Math.cos(ang).toFixed(4)};--ay:${Math.sin(ang).toFixed(4)}"><div>${LI(PI[ic[i]])}<b>${esc(a)}</b></div></div>`}).join('');
 const sp=$('#agents');sp.style.animation='none';$$('#agents .agent>div').forEach(d=>d.style.animation='none');void sp.offsetWidth;sp.style.animation='';$$('#agents .agent>div').forEach(d=>d.style.animation='');
 if(chatSeen)typeChat();else{$('#typed').textContent='';$('#ans').classList.remove('on')}}
/* canvas loops run only while on screen */
function cvLoop(cv,frame){let on=false,id=0;const tick=()=>{frame();if(on&&!RM)id=requestAnimationFrame(tick)};
 if('IntersectionObserver' in window)new IntersectionObserver(([e])=>{if(e.isIntersecting&&!on){on=true;tick()}else if(!e.isIntersecting){on=false;cancelAnimationFrame(id)}}).observe(cv);frame()}
/* convergence field: many sources streaming into one insight (mirrors in RTL) */
function field(cv,o){const ctx=cv.getContext('2d');let w=0,h=0,dpr=1,P=[],mx=0,my=0,tmx=0,tmy=0,t=0;
 const size=()=>{dpr=Math.min(devicePixelRatio||1,1.5);w=cv.offsetWidth;h=cv.offsetHeight;cv.width=w*dpr;cv.height=h*dpr;P=Array.from({length:innerWidth<700?o.n/2|0:o.n},()=>seed({},true))};
 const cx=()=>w*o.x+mx*30,cy=()=>h*o.y+my*20;
 function seed(p,fresh){const r=Math.random();if(r<.55){p.x=-20;p.y=Math.random()*h}else if(r<.78){p.x=Math.random()*w*.85;p.y=-20}else{p.x=Math.random()*w*.85;p.y=h+20}
  if(fresh){const k=Math.random()*.85;p.x+=(cx()-p.x)*k;p.y+=(cy()-p.y)*k}p.c=Math.random()<.14?1:0;p.curl=(Math.random()-.5)*1.2;p.px=p.x;p.py=p.y;return p}
 size();addEventListener('resize',size);if('ResizeObserver' in window)new ResizeObserver(()=>{if(cv.offsetWidth!==w||cv.offsetHeight!==h)size()}).observe(cv);
 cv.parentElement.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect(),rtl=document.documentElement.dir==='rtl';tmx=((e.clientX-r.left)/r.width-.5)*(rtl?-1:1);tmy=(e.clientY-r.top)/r.height-.5});
 cvLoop(cv,()=>{if(!w)return;const rtl=document.documentElement.dir==='rtl';mx+=(tmx-mx)*.04;my+=(tmy-my)*.04;
  ctx.setTransform(rtl?-dpr:dpr,0,0,dpr,rtl?w*dpr:0,0);ctx.clearRect(0,0,w,h);const X=cx(),Y=cy();
  if(o.lines){const g=ctx.createLinearGradient(0,0,X,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.16)');ctx.strokeStyle=g;ctx.lineWidth=1;ctx.beginPath();for(let i=0;i<o.lines;i++){const y0=(i+.5)/o.lines*h;ctx.moveTo(0,y0);ctx.bezierCurveTo(X*.45,y0,X*.75,Y+(y0-Y)*.2,X,Y)}ctx.stroke()}
  if(o.beam){ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(X,Y);ctx.lineTo(w,Y);ctx.stroke()}
  const R=Math.hypot(w,h)*.8;
  for(const p of P){const dx=X-p.x,dy=Y-p.y,d=Math.hypot(dx,dy)||1,nx=dx/d,ny=dy/d,sp=(2+(1-Math.min(d/(w*.7),1))*5)*o.speed,cf=Math.min(d/300,1);
   p.px=p.x;p.py=p.y;p.x+=nx*sp-ny*p.curl*sp*cf;p.y+=ny*sp+nx*p.curl*sp*cf;p.a=Math.max(0,1-d/R);if(d<10)seed(p,false)}
  for(const c of [0,1])for(const b of [.25,.55,.9]){ctx.beginPath();let any=false;
   for(const p of P){if(p.c!==c)continue;const bk=p.a<.4?.25:p.a<.7?.55:.9;if(bk!==b)continue;ctx.moveTo(p.px-(p.x-p.px)*3,p.py-(p.y-p.py)*3);ctx.lineTo(p.x,p.y);any=true}
   if(any){ctx.strokeStyle=c?`rgba(255,196,110,${b*.85})`:`rgba(225,245,253,${b})`;ctx.lineWidth=c?1.4:1;ctx.stroke()}}
  const pu=1+Math.sin(t*.003)*.12,rg=ctx.createRadialGradient(X,Y,0,X,Y,130*pu);rg.addColorStop(0,'rgba(255,255,255,.55)');rg.addColorStop(.3,'rgba(160,220,245,.2)');rg.addColorStop(1,'rgba(160,220,245,0)');
  ctx.fillStyle=rg;ctx.beginPath();ctx.arc(X,Y,130*pu,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(X,Y,4,0,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.45)';ctx.beginPath();ctx.arc(X,Y,18+Math.sin(t*.004)*3,0,7);ctx.stroke();t+=16})}
/* archive: scroll scrubs the year back from 2026; milestones light up as you pass them */
function renderArch(){const A=ARC[lang];
 $('#tl').innerHTML=A.map(([y,t,f,fl],i)=>`<li class="tn${i%2?' dn':' up'}${i===A.length-1?' now':''}" style="--i:${i}"><span class="tdot" aria-hidden="true"></span><span class="ty num">${y}</span><div class="tc"><b>${esc(t)}</b>${f?`<span class="tf"><strong class="num">${esc(f)}</strong> ${esc(fl)}</span>`:''}</div></li>`).join('')}
function archScrub(){}
if('IntersectionObserver' in window&&!RM)new IntersectionObserver(es=>es.forEach(e=>$('#tl').classList.toggle('in',e.isIntersecting)),{threshold:.25}).observe($('#tl'));else $('#tl').classList.add('in');
(function strata(){const cv=$('#strata');if(!cv)return;const ctx=cv.getContext('2d');let w=0,h=0,t=0;
 const size=()=>{const d=Math.min(devicePixelRatio||1,1.5);w=cv.offsetWidth;h=cv.offsetHeight;cv.width=w*d;cv.height=h*d;ctx.setTransform(d,0,0,d,0,0)};size();addEventListener('resize',size);if('ResizeObserver' in window)new ResizeObserver(()=>{if(cv.offsetWidth!==w||cv.offsetHeight!==h)size()}).observe(cv);
 cvLoop(cv,()=>{if(!w)return;ctx.clearRect(0,0,w,h);for(let i=0;i<28;i++){const dp=i/28,y=h*(.08+dp*.9)+Math.sin(t*.0006+i)*2,off=(archP*900*(1-dp))%w;
  ctx.strokeStyle=`rgba(255,255,255,${.04+dp*.08})`;ctx.lineWidth=1;ctx.beginPath();for(let x=0;x<=w;x+=24){const yy=y+Math.sin((x+off)*.008+i*.6)*6*(1-dp);x?ctx.lineTo(x,yy):ctx.moveTo(x,yy)}ctx.stroke();
  ctx.fillStyle=`rgba(255,255,255,${.05+dp*.1})`;for(let k=0;k<6;k++){const x=((k*197+i*61-off*1.5)%w+w)%w;ctx.fillRect(x,y-1,18+((i*k)%20),2)}}t+=16})})();

/* hero: calm "funnel" — sources travel along converging paths into Acumen, and leave as ordered data rows */
function funnel(cv,o){const ctx=cv.getContext('2d');let w=0,h=0,dpr=1,IN=[],OUT=[],t=0,pulse=0;const L=o.lanes,OL=5;
 const X=()=>w*o.x,Y=()=>h*o.y;
 const bz=(a,b,c,d,u)=>{const v=1-u;return v*v*v*a+3*v*v*u*b+3*v*u*u*c+u*u*u*d};
 const path=(i,u)=>{const y0=(i+.5)/L*h,x1=X(),y1=Y();return [bz(-10,x1*.42,x1*.78,x1,u),bz(y0,y0,y1+(y0-y1)*.12,y1,u)]};
 const newIn=fresh=>({lane:Math.random()*L|0,u:fresh?Math.random():0,sp:.0016+Math.random()*.0014,c:Math.random()<.1?1:0});
 const outY=(j,x)=>Y()+(j-(OL-1)/2)*(7+(x-X())*.075);
 const newOut=()=>({j:Math.random()*OL|0,x:X()+6,len:8+Math.random()*16,sp:1.1+Math.random()*.5});
 const size=()=>{dpr=Math.min(devicePixelRatio||1,1.5);w=cv.offsetWidth;h=cv.offsetHeight;cv.width=w*dpr;cv.height=h*dpr;IN=Array.from({length:innerWidth<700?o.n/2|0:o.n},()=>newIn(true));OUT=[]};
 size();addEventListener('resize',size);if('ResizeObserver' in window)new ResizeObserver(()=>{if(cv.offsetWidth!==w||cv.offsetHeight!==h)size()}).observe(cv);
 cvLoop(cv,()=>{if(!w)return;const rtl=document.documentElement.dir==='rtl';ctx.setTransform(rtl?-dpr:dpr,0,0,dpr,rtl?w*dpr:0,0);ctx.clearRect(0,0,w,h);
  const x1=X(),y1=Y();
  /* faint input paths */
  const g=ctx.createLinearGradient(0,0,x1,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.12)');ctx.strokeStyle=g;ctx.lineWidth=1;ctx.beginPath();
  for(let i=0;i<L;i++){const y0=(i+.5)/L*h;ctx.moveTo(-10,y0);ctx.bezierCurveTo(x1*.42,y0,x1*.78,y1+(y0-y1)*.12,x1,y1)}ctx.stroke();
  /* faint output lanes */
  ctx.strokeStyle='rgba(255,255,255,.09)';ctx.beginPath();for(let j=0;j<OL;j++){ctx.moveTo(x1,outY(j,x1));ctx.lineTo(w,outY(j,w))}ctx.stroke();
  /* incoming: short streaks riding the paths */
  for(const c of [0,1])for(const [lo,hi,al] of [[0,.45,.28],[.45,.75,.55],[.75,1.01,.85]]){ctx.beginPath();for(const p of IN){if(p.c!==c||p.u<lo||p.u>=hi)continue;const [ax,ay]=path(p.lane,Math.max(0,p.u-.025)),[bx,by]=path(p.lane,p.u);ctx.moveTo(ax,ay);ctx.lineTo(bx,by)}
   ctx.strokeStyle=c?`rgba(255,200,120,${al})`:`rgba(230,246,253,${al})`;ctx.lineWidth=c?1.4:1.1;ctx.stroke()}
  for(const p of IN){p.u+=p.sp*(1+p.u*1.6);if(p.u>=1){Object.assign(p,newIn(false));pulse=1;if(OUT.length<o.out)OUT.push(newOut())}}
  /* outgoing: tidy data blocks */
  ctx.fillStyle='rgba(191,230,247,.85)';
  for(const q of OUT){const y=outY(q.j,q.x),a=Math.max(0,1-(q.x-x1)/(w-x1));ctx.globalAlpha=.25+.75*a;ctx.beginPath();ctx.roundRect?ctx.roundRect(q.x,y-1.5,q.len,3,1.5):ctx.rect(q.x,y-1.5,q.len,3);ctx.fill();q.x+=q.sp}
  ctx.globalAlpha=1;OUT=OUT.filter(q=>q.x<w+30);
  /* the core: Acumen as the container */
  pulse*=.94;const r=26+pulse*4,rg=ctx.createRadialGradient(x1,y1,0,x1,y1,110);rg.addColorStop(0,'rgba(255,255,255,.32)');rg.addColorStop(.35,'rgba(160,220,245,.12)');rg.addColorStop(1,'rgba(160,220,245,0)');
  ctx.fillStyle=rg;ctx.beginPath();ctx.arc(x1,y1,110,0,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x1,y1,r,0,7);ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x1,y1,r+12+Math.sin(t*.002)*2,0,7);ctx.stroke();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x1,y1,5,0,7);ctx.fill();t+=16})}
funnel($('#field'),{x:.7,y:.42,n:70,lanes:16,out:70});

/* reference convergence field (Immersive handoff), verbatim behaviour: motion trails, sky + amber streaks, pulsing core */
function refField(cv,o){const ctx=cv.getContext('2d');let w=0,h=0,dpr=1,P=[],mx=0,my=0,tmx=0,tmy=0,t=0,guides=[],lastX=-1,lastY=-1;
 const N=()=>innerWidth<700?o.n/2|0:o.n,cx=()=>w*o.x+mx*30,cy=()=>h*o.y+my*20;
 function seed(p,fresh){const side=Math.random();if(side<.55){p.x=-20;p.y=Math.random()*h}else if(side<.78){p.x=Math.random()*w*.8;p.y=-20}else{p.x=Math.random()*w*.8;p.y=h+20}
  if(fresh){const k=Math.random();p.x+=(cx()-p.x)*k*.85;p.y+=(cy()-p.y)*k*.85}p.c=Math.random()<.18?1:0;p.curl=(Math.random()-.5)*1.2;p.px=p.x;p.py=p.y;return p}
 function buildGuides(X,Y){guides=[];if(!o.lines)return;const g=ctx.createLinearGradient(0,0,X,0);g.addColorStop(0,'rgba(92,196,238,0)');g.addColorStop(1,'rgba(92,196,238,.13)');const path=new Path2D();for(let i=0;i<o.lines;i++){const y0=(i+.5)/o.lines*h;path.moveTo(0,y0);path.bezierCurveTo(X*.45,y0,X*.75,Y+(y0-Y)*.2,X,Y)}guides=[path,g];lastX=X;lastY=Y}
 function size(){dpr=Math.min(devicePixelRatio||1,1.5);w=cv.offsetWidth;h=cv.offsetHeight;cv.width=w*dpr;cv.height=h*dpr;lastX=-1;P=Array.from({length:N()},()=>seed({},true))}
 size();addEventListener('resize',size);if('ResizeObserver' in window)new ResizeObserver(()=>{if(cv.offsetWidth!==w||cv.offsetHeight!==h)size()}).observe(cv);
 cv.parentElement.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect(),rtl=document.documentElement.dir==='rtl';tmx=((e.clientX-r.left)/r.width-.5)*(rtl?-1:1);tmy=(e.clientY-r.top)/r.height-.5});
 cvLoop(cv,()=>{if(!w)return;const rtl=document.documentElement.dir==='rtl';ctx.setTransform(rtl?-dpr:dpr,0,0,dpr,rtl?w*dpr:0,0);
  mx+=(tmx-mx)*.04;my+=(tmy-my)*.04;ctx.fillStyle=o.bg;ctx.fillRect(0,0,w,h);const X=cx(),Y=cy();
  if(Math.abs(X-lastX)>1.5||Math.abs(Y-lastY)>1.5)buildGuides(X,Y);if(guides.length){ctx.lineWidth=1;ctx.strokeStyle=guides[1];ctx.stroke(guides[0])}
  ctx.strokeStyle='rgba(92,196,238,.3)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(X,Y);ctx.lineTo(w,Y);ctx.stroke();
  const R=Math.hypot(w,h)*.8;
  for(const p of P){const dx=X-p.x,dy=Y-p.y,d=Math.hypot(dx,dy)||1,nx=dx/d,ny=dy/d,sp=(2+(1-Math.min(d/(w*.7),1))*5)*o.speed,cf=Math.min(d/300,1);
   p.px=p.x;p.py=p.y;p.x+=nx*sp+(-ny)*p.curl*sp*cf;p.y+=ny*sp+nx*p.curl*sp*cf;p.a=Math.max(0,1-d/R);if(d<10)seed(p,false)}
  for(const c of [0,1])for(const b of [.25,.55,.9]){ctx.beginPath();let any=false;
   for(const p of P){if(p.c!==c)continue;const bk=p.a<.4?.25:p.a<.7?.55:.9;if(bk!==b)continue;ctx.moveTo(p.px-(p.x-p.px)*3,p.py-(p.y-p.py)*3);ctx.lineTo(p.x,p.y);any=true}
   if(any){ctx.strokeStyle=c?`rgba(242,163,58,${b*.8})`:`rgba(92,196,238,${b})`;ctx.lineWidth=c?1.4:1;ctx.stroke()}}
  const pulse=1+Math.sin(t*.003)*.12,rg=ctx.createRadialGradient(X,Y,0,X,Y,140*pulse);rg.addColorStop(0,'rgba(92,196,238,.55)');rg.addColorStop(.25,'rgba(0,132,187,.18)');rg.addColorStop(1,'rgba(0,132,187,0)');
  ctx.fillStyle=rg;ctx.beginPath();ctx.arc(X,Y,140*pulse,0,7);ctx.fill();ctx.fillStyle='#E9F8FE';ctx.beginPath();ctx.arc(X,Y,4,0,7);ctx.fill();
  ctx.strokeStyle='rgba(92,196,238,.35)';ctx.beginPath();ctx.arc(X,Y,18+Math.sin(t*.004)*3,0,7);ctx.stroke();t+=16})}
refField($('#field2'),{x:.5,y:.5,n:120,lines:0,speed:.8,bg:'rgba(10,20,38,.3)'});
if('IntersectionObserver' in window){new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!chatSeen){chatSeen=true;typeChat()}}),{threshold:.4}).observe($('#chat'));
 new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)platAuto();else clearInterval(ptTimer)}),{threshold:.3}).observe($('#mock'))}else{chatSeen=true;typeChat()}

$('#lpause').addEventListener('click',e=>{const b=e.currentTarget,on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);$('#ticker').classList.toggle('paused',on)});
{const m=$('#mock')&&$('#mock').closest('.tour-mock');if(m){['pointerenter','focusin','touchstart'].forEach(ev=>m.addEventListener(ev,()=>{platHold=true;clearInterval(ptTimer)}));['pointerleave','focusout'].forEach(ev=>m.addEventListener(ev,()=>{platHold=false;platAuto()}))}}
{const v=$('#vid'),c=navigator.connection||{};if(v){if(!RM&&innerWidth>700&&!c.saveData&&!/2g/.test(c.effectiveType||'')){const so=document.createElement('source');so.src=v.dataset.src;so.type='video/mp4';v.appendChild(so);v.load();v.play().catch(()=>{})}
 if('IntersectionObserver' in window)new IntersectionObserver(([e])=>{if(!v.currentSrc)return;e.isIntersecting?v.play().catch(()=>{}):v.pause()}).observe(v)}}
apply();
