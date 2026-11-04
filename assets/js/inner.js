/* Acumen website — inner pages: shared header/footer, 5-language switch, page rendering from PG (pages.js). */
const LC=LANGS.map(x=>x[0]),RTL=['ar','ur'];
let lang='en';try{const s=localStorage.getItem('acumen-evolve-lang');if(LC.includes(s))lang=s}catch(e){}
try{const q=(new URLSearchParams(location.search).get('lang')||'').toLowerCase();if(LC.includes(q))lang=q}catch(e){}
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])).replace(/(Deep Research|Command Center|Media Digest|Acumen AI)/g,'<bdi class="pn">$1</bdi>');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const PAGE=document.body.dataset.page;
const CHK='<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const ARW='<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="arw"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const L=p=>'../'+p+'index.html?lang='+lang;          /* link to another page of this site */
const H=a=>'../index.html?lang='+lang+(a||'');        /* link to a homepage section */
const btn=(t,href,cls)=>`<a class="btn ${cls||'btn-a'}" href="${href}">${esc(t)}</a>`;
const ttl=(h,sub,id)=>`<h2 class="title"${id?` id="${id}"`:''}>${esc(h)}</h2>${sub?`<p class="title-sub">${esc(sub)}</p>`:''}`;
const cta=(h,b,href)=>`<section class="sec pcta"><div class="wrap pcta-in rv"><h2>${esc(h)}</h2>${btn(b,href||L('contact/'),'btn-w')}</div></section>`;

/* ---------- page renderers ---------- */
const R={
coverage(P){const mi={print:'print',online:'online',tv:'tv',social:'social',yt:'yt',archive:'archive'};
 return `<section class="sec"><div class="wrap rv">${ttl(P.tableH)}
  <div class="ptable-w" role="region" aria-label="${esc(P.tableH)}" tabindex="0"><table class="ptable"><thead><tr>${P.cols.map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
  <tbody>${P.rows.map(r=>`<tr>${r.map((c,i)=>i?`<td data-l="${esc(P.cols[i])}">${c?`<bdi>${esc(c)}</bdi>`:'<span aria-hidden="true">—</span>'}</td>`:`<th scope="row">${esc(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div></div></section>
 <section class="sec soft"><div class="wrap">${ttl(P.mediaH)}<div class="mdet">${P.media.map(m=>`<article class="mcd rv" id="${m.id}"><div class="mcd-h">${MI[mi[m.icon]]||''}<span class="tag">${esc(m.name)}</span></div><h3>${esc(m.h)}</h3><p class="lead2">${esc(m.lead)}</p><ul class="figs">${m.figs.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><p>${esc(m.body)}</p></article>`).join('')}</div>
  <p class="callout rv">${esc(P.callout)}</p></div></section>${cta(P.ctaH,P.ctaB)}`},
solutions(P){const C=PG[lang].common;
 const needs=P.needs.map((n,i)=>`<article class="ncd" id="need-${i+1}"><span class="tag">${esc(n.name)}</span><h3>${esc(n.h)}</h3><p>${esc(n.lead)}</p><h4>${esc(C.helps)}</h4><ul class="chk">${n.helps.map(x=>`<li>${CHK}<span>${esc(x)}</span></li>`).join('')}</ul><div class="proof">${n.proof.map(x=>`<span>${esc(x)}</span>`).join('')}</div></article>`).join('');
 const segs=P.segs.map(g=>`<article class="sgd" id="${g.key}">${SVG(TI[g.key])}<div><span class="tag">${esc(g.name)}</span><h3>${esc(g.h)}</h3><p>${esc(g.lead)}</p><h4>${esc(C.provide)}</h4><ul class="chk">${g.items.map(x=>`<li>${CHK}<span>${esc(x)}</span></li>`).join('')}</ul>${btn(g.cta,L('contact/'),'btn-o')}</div></article>`).join('');
 return `<section class="sec"><div class="wrap"><div class="stabs" role="tablist" aria-label="${esc(P.h1)}"><button role="tab" id="st1" aria-controls="sp1" aria-selected="true" type="button">${esc(P.tabNeed)}</button><button role="tab" id="st2" aria-controls="sp2" aria-selected="false" tabindex="-1" type="button">${esc(P.tabSeg)}</button></div>
  <div class="spanel" id="sp1" role="tabpanel" aria-labelledby="st1"><h2 class="sr">${esc(P.tabNeed)}</h2><div class="ngrid">${needs}</div></div>
  <div class="spanel" id="sp2" role="tabpanel" aria-labelledby="st2" hidden><h2 class="sr">${esc(P.tabSeg)}</h2><div class="sgrid">${segs}</div></div></div></section>${cta(P.ctaH,P.ctaB)}`},
about(P){const A=ARC[lang];
 return `<section class="sec"><div class="wrap">${ttl(P.storyH)}<ol class="vtl rv">${A.map(([y,t,f,fl])=>`<li><span class="y num">${esc(y)}</span><div><b>${esc(t)}</b>${f?`<span class="f"><bdi>${esc(f)}</bdi>${fl?' '+esc(fl):''}</span>`:''}</div></li>`).join('')}</ol><p class="affil rv">${esc(P.affil)}</p></div></section>
 <section class="sec soft" id="how"><div class="wrap">${ttl(P.howH,P.howS)}<ol class="steps6 rv">${P.steps.map((s,i)=>`<li><span class="n num">0${i+1}</span><b>${esc(s)}</b></li>`).join('')}</ol></div></section>
 <section class="sec" id="team"><div class="wrap">${ttl(P.centersH)}<div class="centers rv">${P.centers.map(c=>`<div class="ctr"><h3>${esc(c.h)}</h3>${c.p?`<p>${esc(c.p)}</p>`:''}</div>`).join('')}</div>
  <div class="pstats rv">${P.stats.map(([n,l])=>`<div><b class="num"><bdi>${esc(n)}</bdi></b><span>${esc(l)}</span></div>`).join('')}</div></div></section>
 <section class="sec" style="padding-top:0"><div class="wrap aboutp"><h2 class="ph2">${esc(P.partnersH)}</h2><div class="plogos"><img loading="lazy" src="../assets/img/partner-media-pan-arab-1.png" alt="Media Pan Arab"><img loading="lazy" src="../assets/img/partner-almotahida-1.png" alt="Almotahida"></div></div></section>${cta(P.ctaH,P.ctaB)}`},
contact(P){const f=P.f,LG=LANGS.map(([c,n])=>`<option value="${c}"${c===lang?' selected':''}>${n}</option>`).join('');
 const fld=(id,lab,type,req,extra)=>`<label class="fld"><span>${esc(lab)}${req?' <i aria-hidden="true">*</i>':''}</span><input id="${id}" name="${id}" type="${type}"${req?' required aria-required="true"':''}${extra||''}></label>`;
 return `<section class="sec"><div class="wrap cgrid">
  <form class="cform rv" id="cform" novalidate aria-labelledby="cfH"><h2 id="cfH">${esc(P.formH)}</h2>
   <div class="frow2">${fld('name',f.name,'text',1,' autocomplete="name"')}${fld('email',f.email,'email',1,' autocomplete="email" dir="ltr"')}</div>
   <div class="frow2">${fld('org',f.org,'text',1,' autocomplete="organization"')}${fld('title',f.title,'text',0,' autocomplete="organization-title"')}</div>
   <div class="frow2"><label class="fld"><span>${esc(f.country)} <i aria-hidden="true">*</i></span><select id="country" name="country" required aria-required="true"><option value="">${esc(f.choose)}</option>${P.countries.map(c=>`<option>${esc(c)}</option>`).join('')}</select></label>${fld('phone',f.phone,'tel',0,' autocomplete="tel" dir="ltr"')}</div>
   <fieldset class="fld ints"><legend>${esc(f.interest)}</legend>${P.interests.map((x,i)=>`<label class="pill"><input type="checkbox" name="interest" value="${i}"><span>${esc(x)}</span></label>`).join('')}</fieldset>
   <label class="fld"><span>${esc(f.message)}</span><textarea id="msg" name="message" rows="4"></textarea></label>
   <label class="fld"><span>${esc(f.plang)}</span><select name="plang">${LG}</select></label>
   <label class="cons"><input type="checkbox" id="consent" required aria-required="true"><span>${esc(f.consent)} <i aria-hidden="true">*</i></span></label>
   <p class="ferr" id="cErr" role="alert" hidden></p><button class="btn btn-a" type="submit">${esc(f.submit)}</button><p class="fok" id="cOk" role="status"></p></form>
  <div class="cside rv"><div class="cbox"><h2>${esc(P.expectH)}</h2><ul class="chk">${P.expect.map(x=>`<li>${CHK}<span>${esc(x)}</span></li>`).join('')}</ul></div>
   <div class="cbox office"><h2>${esc(P.officeH)}</h2><b>${esc(P.city)}</b><address>${esc(P.addr)}<br><span>${esc(P.phoneL)}:</span> <a href="tel:+97145136836"><bdi>+971 4 513 6836</bdi></a></address></div></div></div></section>`},
insights(P){const C=PG[lang].common,img={digest:'../assets/img/digest.jpg',reports:'',articles:'',glossary:''};
 return `<section class="sec"><div class="wrap"><div class="catgrid">${P.cats.map(c=>{const live=c.key==='digest';const inner=`<div class="cat-b"><h2>${esc(c.h)}</h2><p>${esc(c.p)}</p>${live?`<span class="more">${esc(c.link)}${ARW}</span>`:`<span class="soon">${esc(C.soon)}</span>`}</div>`;
  return live?`<a class="cat rv live" href="${L('media-digest/')}"><img src="${img.digest}" alt="" loading="lazy">${inner}</a>`:`<div class="cat rv">${inner}</div>`}).join('')}</div></div></section>${cta(PG[lang].digest.formH,PG[lang].digest.submit,L('media-digest/'))}`},
digest(P){const LG=LANGS.map(([c,n])=>`<option value="${c}"${c===lang?' selected':''}>${n}</option>`).join('');
 return `<section class="sec"><div class="wrap dgrid"><div class="rv"><img class="dimg" src="../assets/img/digest.jpg" alt="" loading="lazy"><h2 class="h3">${esc(P.aboutH)}</h2><p>${esc(P.about)}</p></div>
  <form class="cform rv" id="sform" novalidate aria-labelledby="sfH"><h2 id="sfH">${esc(P.formH)}</h2>
  <label class="fld"><span>${esc(P.email)} <i aria-hidden="true">*</i></span><input id="semail" type="email" autocomplete="email" required aria-required="true" dir="ltr" aria-describedby="sErr"></label>
  <label class="fld"><span>${esc(P.plang)}</span><select>${LG}</select></label>
  <p class="ferr" id="sErr" role="alert" hidden></p><button class="btn btn-a" type="submit">${esc(P.submit)}</button><p class="fok" id="sOk" role="status"></p></form></div></section>`}
};

/* ---------- apply language ---------- */
function apply(){const r=document.documentElement;r.lang=lang;r.dir=RTL.includes(lang)?'rtl':'ltr';const D=T[lang],P=PG[lang][PAGE],C=PG[lang].common;
 document.title=P.metaT;{const md=document.querySelector('meta[name=description]');md&&md.setAttribute('content',P.metaD)}
 $$('[data-al]').forEach(e=>e.setAttribute('aria-label',D[e.dataset.al]));$('.logo').setAttribute('aria-label',D.brand);
 $$('[data-i]').forEach(e=>{const v=D[e.dataset.i];if(v!=null)e.innerHTML=esc(v)});
 $('#langCur').textContent=LANGS.find(x=>x[0]===lang)[1];$('#lang').setAttribute('aria-label',D.langL+': '+LANGS.find(x=>x[0]===lang)[1]);const LO=LANGS.map(([c,n,d])=>`<button class="lopt" type="button" data-l="${c}" lang="${c}" dir="${d}"${c===lang?' aria-current="true"':''}>${n}</button>`);$('#lmenu').innerHTML=LO.map(b=>`<li>${b}</li>`).join('');$('#lmenu').setAttribute('aria-label',D.langL);$('#dlang').innerHTML=LO.join('');$('#dlang').setAttribute('aria-label',D.langL);$('#menu').setAttribute('aria-label',D.menu);
 /* hero */
 $('#crumbs').innerHTML=`<a href="${H()}">${esc(C.home)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(P.kick===P.h1?P.h1:P.kick)}</span>`;
 $('#pkick').innerHTML=esc(P.kick);$('#ph1').innerHTML=esc(P.h1);$('#plead').innerHTML=esc(P.lead);
 $('#pcta').innerHTML=PAGE==='contact'?'':PAGE==='digest'?btn(P.submit,'#sform','btn-w'):btn(C.demoCta,L('contact/'),'btn-w');
 $('#pg').innerHTML=R[PAGE](P);
 /* footer */
 const F=FOOT[lang];const FL={f1:[H('#platform'),H('#platform'),H('#platform'),H('#platform'),H('#ai')],f2:[L('coverage/')+'#print',L('coverage/')+'#online',L('coverage/')+'#tv',L('coverage/')+'#social',L('coverage/')+'#archive'],f3:[L('solutions/')+'#gov',L('solutions/')+'#corp',L('solutions/')+'#pr',L('solutions/')+'#intl'],f4:[L('about/'),L('about/')+'#how',L('about/'),L('contact/')],f5:[L('media-digest/'),L('insights/'),L('insights/'),L('insights/')]};
 ['f1','f2','f3','f4','f5'].forEach(k=>$('#'+k).innerHTML=F[k].map((x,i)=>`<a href="${FL[k][i]||FL[k][0]}">${esc(x)}</a>`).join(''));
 /* header + drawer links */
 $$('[data-nav]').forEach(a=>{const v=a.dataset.nav;a.setAttribute('href',v.startsWith('#')?H(v):L(v))});
 $('.logo').setAttribute('href',H());
 $$('[data-nav]').forEach(a=>{const cur=a.dataset.nav===(PAGE==='digest'?'insights/':PAGE+'/');a.toggleAttribute('aria-current',cur);if(cur)a.setAttribute('aria-current','page')});
 try{localStorage.setItem('acumen-evolve-lang',lang)}catch(e){}
 wire();reveal();onScroll()}

/* ---------- behaviours ---------- */
let rvIO;function reveal(){const els=$$('.rv:not(.in)');if(RM||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
 if(!rvIO)rvIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvIO.unobserve(e.target)}}),{rootMargin:'0px 0px -6% 0px'});els.forEach(e=>rvIO.observe(e))}
const mail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
function wire(){const P=PG[lang][PAGE];
 /* solutions tabs (arrow keys mirrored in RTL); a #segment hash opens the segment tab */
 const tabs=$$('.stabs [role=tab]');if(tabs.length){const sel=i=>{tabs.forEach((t,j)=>{t.setAttribute('aria-selected',j===i);t.tabIndex=j===i?0:-1;$('#'+t.getAttribute('aria-controls')).hidden=j!==i})};
  tabs.forEach((t,i)=>{t.onclick=()=>sel(i);t.onkeydown=e=>{const rtl=RTL.includes(lang);let d=0;if(e.key===(rtl?'ArrowLeft':'ArrowRight'))d=1;if(e.key===(rtl?'ArrowRight':'ArrowLeft'))d=-1;if(e.key==='Home'){e.preventDefault();sel(0);tabs[0].focus()}if(e.key==='End'){e.preventDefault();sel(tabs.length-1);tabs[tabs.length-1].focus()}if(d){e.preventDefault();const n=(i+d+tabs.length)%tabs.length;sel(n);tabs[n].focus()}}});
  const h=location.hash.slice(1);if(['gov','corp','pr','intl'].includes(h)){sel(1);setTimeout(()=>{const el=document.getElementById(h);el&&el.scrollIntoView({block:'start'})},60)}}
 const cf=$('#cform');if(cf)cf.onsubmit=e=>{e.preventDefault();const err=$('#cErr');let bad=null;
  cf.querySelectorAll('[required]').forEach(x=>{const ok=x.type==='checkbox'?x.checked:x.type==='email'?mail(x.value.trim()):x.value.trim()!=='';x.toggleAttribute('aria-invalid',!ok);if(!ok)x.setAttribute('aria-invalid','true');if(!ok&&!bad)bad=x});
  if(bad){err.textContent=bad.type==='email'&&bad.value?P.errEmail:P.errReq;err.hidden=false;bad.focus();$('#cOk').textContent='';return}
  err.hidden=true;$('#cOk').textContent=P.ok;cf.reset()};
 const sf=$('#sform');if(sf)sf.onsubmit=e=>{e.preventDefault();const i=$('#semail'),err=$('#sErr');if(!mail(i.value.trim())){i.setAttribute('aria-invalid','true');err.textContent=T[lang].dErr;err.hidden=false;i.focus();$('#sOk').textContent='';return}
  i.removeAttribute('aria-invalid');err.hidden=true;$('#sOk').textContent=P.ok;sf.reset()};
 if(location.hash&&!['#gov','#corp','#pr','#intl'].includes(location.hash)){const el=document.getElementById(location.hash.slice(1));if(el)setTimeout(()=>el.scrollIntoView({block:'start'}),60)}}

const hdr=$('#hdr');const prog=$('#prog');const onScroll=()=>{hdr.classList.toggle('solid',scrollY>40||$('#drawer').classList.contains('open'));const m=document.documentElement.scrollHeight-innerHeight;prog.style.transform='scaleX('+(m>0?scrollY/m:0)+')'};addEventListener('scroll',onScroll,{passive:true});
const lm=$('#lmenu'),lb=$('#lang');const closeL=()=>{lm.classList.remove('open');lb.setAttribute('aria-expanded','false')};
lb.addEventListener('click',e=>{e.stopPropagation();const o=lm.classList.toggle('open');lb.setAttribute('aria-expanded',o);if(o&&e.detail===0){const c=lm.querySelector('[aria-current]')||lm.querySelector('.lopt');c&&c.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.lsw'))closeL()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lm.classList.contains('open')){closeL();lb.focus()}});
lm.addEventListener('keydown',e=>{if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;e.preventDefault();const b=[...lm.querySelectorAll('.lopt')],i=b.indexOf(document.activeElement);b[(i+(e.key==='ArrowDown'?1:-1)+b.length)%b.length].focus()});
const pickL=e=>{const b=e.target.closest('.lopt');if(!b)return;lang=b.dataset.l;closeL();apply();try{const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u)}catch(_){}if(e.currentTarget===lm)lb.focus()};
const closeD=()=>{$('#drawer').classList.remove('open');$('#menu').setAttribute('aria-expanded',false);onScroll()};
lm.addEventListener('click',pickL);$('#dlang').addEventListener('click',e=>{pickL(e);closeD()});
$('#menu').addEventListener('click',()=>{const d=$('#drawer');{const hh=Math.ceil(hdr.getBoundingClientRect().bottom);d.style.top=hh+'px';d.style.maxHeight=(innerHeight-hh)+'px'}const o=d.classList.toggle('open');$('#menu').setAttribute('aria-expanded',o);onScroll();if(o){const f=d.querySelector('a');f&&f.focus()}});
new MutationObserver(()=>document.documentElement.classList.toggle('dr-open',$('#drawer').classList.contains('open'))).observe($('#drawer'),{attributes:true,attributeFilter:['class']});
$('#drawer').addEventListener('focusout',e=>{const d=$('#drawer');if(d.classList.contains('open')&&e.relatedTarget&&!d.contains(e.relatedTarget)&&e.relatedTarget!==$('#menu'))closeD()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#drawer').classList.contains('open')){closeD();$('#menu').focus()}});
addEventListener('resize',()=>{if(innerWidth>1280&&$('#drawer').classList.contains('open'))closeD()});
$$('#drawer a').forEach(a=>a.addEventListener('click',closeD));
apply();
