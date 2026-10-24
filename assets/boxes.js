/* Design & Celebrate: Night Vibe Box data, drawings and pages.
   Used by night-vibe-box.html (the hub: DCBoxes.hub) and every box-*.html page (DCBoxes.page('girls') ...).
   Names, contents and prices are the owner's to edit; items starting with "+" are the extras a bigger size adds. */
(() => {
  // ---------- small drawing helpers ----------
  const star5 = (x, y, R, f) => { let d = ''; for (let k = 0; k < 10; k++){ const r = k % 2 ? R * .45 : R, a = Math.PI / 5 * k - Math.PI / 2; d += (k ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ' ' + (y + r * Math.sin(a)).toFixed(1); } return `<path d="${d}z" fill="${f}"/>`; };
  const star4 = (x, y, s, f, cls = '') => `<path ${cls} d="M${x} ${y-s}Q${x} ${y} ${x+s} ${y}Q${x} ${y} ${x} ${y+s}Q${x} ${y} ${x-s} ${y}Q${x} ${y} ${x} ${y-s}z" fill="${f}"/>`;

  // ---------- the boxes (names, contents and prices are the owner's to edit) ----------
  // items starting with "+" are the extras a bigger size adds; they get a small tag
  const HB = '«<span class="latin">Happy Birthday</span>»';
  const BOXES = [
    // the mystery box: no list of contents on purpose; the customer picks a budget, who it's for and their age, and we fill it
    {id:'mystery', latin:'Mystery Box', name:'المفاجأة', bx:'#6E56CF', bxt:'#F2C94C', tag:'جديد', mystery:true,
     desc:'اختار ميزانيتك وقلّنا لمين البوكس، والباقي علينا. ما رح تعرف شو جوّا لحتى تفتحو!', sizes:[
      {name:'صغيرة', who:'٣ لـ ٤ هدايا صغيرة', price:15},
      {name:'وسط', who:'٥ لـ ٦ هدايا', price:25},
      {name:'كبيرة', who:'٧ هدايا وأكتر', price:40},
      {name:'VIP', who:'هدايا أكبر، وفيها قطعة مميزة', price:60}]},
    {id:'movie', latin:'Movie Night', name:'سهرة أفلام', bx:'#D8473F', bxt:'#FF9D8A', tag:'الأكثر طلباً',
     desc:'فشار ومشروب وضو خفيف، وإنتو بس اختاروا الفيلم.', sizes:[
      {name:'لشخصين', who:'لسهرة هادية لاتنين', price:15, items:['سطل فشار مع فشار لشخصين','٢ مشروب غازي','شوكولا وكيسين شيبس','٢ شمعة LED','سلسلة ضو صغيرة (٢ متر)']},
      {name:'للشلة', who:'من ٤ لـ ٦ أشخاص', price:28, items:['٢ سطل فشار مع فشار للشلة','٦ مشروبات','شوكولا وشيبس للكل','٤ شموع LED','سلسلة ضو (٣ متر)']},
      {name:'VIP', who:'للشلة، مع دلع زيادة', price:45, items:['٢ سطل فشار مع فشار للشلة','٦ مشروبات','شوكولا وشيبس للكل','٤ شموع LED','سلسلة ضو (٣ متر)','+بطانية صغيرة ناعمة','+علبة مكسرات']}]},
    {id:'girls', latin:'Girls Night', name:'سهرة بنات', bx:'#F2A7B8', bxt:'#F7B8C8',
     desc:'ماسكات ومناكير وشمعة ريحتها بتجنن، لسهرة حكي للصبح.', sizes:[
      {name:'لشخصين', who:'لصاحبتين', price:19, items:['٢ ماسك للوجه','طقم مناكير ٣ ألوان','٢ سكرنشي','شمعة معطّرة صغيرة','سناكات خفيفة','سلسلة ضو صغيرة']},
      {name:'للشلة', who:'من ٤ لـ ٦ بنات', price:34, items:['٦ ماسكات للوجه','طقم مناكير ٦ ألوان','٦ سكرنشي','شمعة معطّرة كبيرة','سناكات للشلة','سلسلة ضو (٣ متر)']},
      {name:'VIP', who:'للشلة، مع دلع زيادة', price:52, items:['٦ ماسكات للوجه','طقم مناكير ٦ ألوان','٦ سكرنشي','شمعة معطّرة كبيرة','سناكات للشلة','سلسلة ضو (٣ متر)','+ماسك نوم ستان لكل وحدة','+لصقات عيون مرطّبة']}]},
    {id:'boys', latin:'Boys Night', name:'سهرة شباب', bx:'#3C8DD6', bxt:'#7FD6C6', tag:'جديد',
     desc:'شيبس ومكسرات ومشروبات، شدّة وأونو، لسهرة ماتش أو لعب للصبح.', sizes:[
      {name:'لشخصين', who:'لسهرة ماتش لاتنين', price:15, items:['٢ كيس شيبس كبير','مكسرات مشكّلة','٢ مشروب غازي','شدّة ورق','علكة وسكاكر']},
      {name:'للشلة', who:'من ٤ لـ ٦ شباب', price:28, items:['٤ أكياس شيبس كبيرة','مكسرات مشكّلة كبيرة','بزر وموالح','٦ مشروبات','شدّة ورق + أونو','سلسلة ضو LED (٣ متر)']},
      {name:'VIP', who:'للشلة، مع دلع زيادة', price:45, items:['٤ أكياس شيبس كبيرة','مكسرات مشكّلة كبيرة','بزر وموالح','٦ مشروبات','شدّة ورق + أونو','سلسلة ضو LED (٣ متر)','+طاولة زهر سفر','+علبة شوكولا']}]},
    {id:'birthday', latin:'Birthday', name:'عيد ميلاد', bx:'#8ED8C0', bxt:'#9EE6CF', tag:'حفلة بعلبة',
     desc:'جيب الكيك، والباقي بالبوكس.', sizes:[
      {name:'صغير', who:'لحفلة صغيرة بالبيت', price:12, items:['١٠ بالونات + بالون رقم',`لافتة ${HB}`,'١٢ شمعة للكيك','٤ قبعات حفلة','كيس كونفيتي','توبر للكيك']},
      {name:'للحفلة', who:'لـ ١٠ أشخاص تقريباً', price:22, items:['٢٥ بالون + بالونين رقم',`لافتة ${HB} كبيرة`,'٢٤ شمعة + شمعة نافورة','١٠ قبعات حفلة','٢ كيس كونفيتي','توبر للكيك']},
      {name:'VIP', who:'حفلة كاملة', price:38, items:['٤٠ بالون مع قوس بالونات','٢ بالون رقم فويل كبار',`لافتة ${HB} وستارة لامعة للحيط`,'٢٤ شمعة + شمعة نافورة','١٥ قبعة وزمامير','كونفيتي','+توبر مكتوب بالاسم']}]},
    {id:'baby', latin:'Baby Box', name:'مولود جديد', bx:'#9CC8EE', bxt:'#F5C2CF', tag:'جديد',
     desc:'لاستقبال البيبي بالبيت أو بالمستشفى. بالأزرق أو بالزهري، وكاسات المغلي علينا.', sizes:[
      {name:'ترحيب', who:'لاستقبال البيبي بالبيت', price:15, items:['٨ بالونات «أهلا بالمولود» أزرق أو زهري','لافتة صغيرة للحيط','كرت تهنئة','٤ شموع LED','سلسلة ضو صغيرة (٢ متر)']},
      {name:'لغرفة المستشفى', who:'لتزيين غرفة الماما بالمستشفى', price:25, items:['١٥ بالون أزرق أو زهري','لافتة «أهلا بالمولود» كبيرة','لوحة للباب باسم البيبي','حروف LED أو سلسلة ضو (٣ متر)','٢٠ كاسة للمغلي مع غطا ومعلقة','كرت تهنئة']},
      {name:'VIP', who:'استقبال كامل مع زاوية للتصوير', price:40, items:['١٥ بالون أزرق أو زهري','لافتة «أهلا بالمولود» كبيرة','لوحة للباب باسم البيبي','حروف LED أو سلسلة ضو (٣ متر)','٢٠ كاسة للمغلي مع غطا ومعلقة','كرت تهنئة','+بالون فويل كبير على شكل نجمة','+توبر للكيك','+إكسسوارات للتصوير']}]},
    {id:'engage', latin:'Engagement Box', name:'خطوبة وكتب كتاب', bx:'#E6C27A', bxt:'#EAD2A0', tag:'جديد',
     desc:'للخطوبة أو كتب الكتاب: ضو هادي وورد، علبة حلوة للمحابس، والملبّس للضيوف.', sizes:[
      {name:'للعيلة', who:'لجمعة العيلة بالبيت', price:22, items:['لافتة «خطوبة مبروكة»','٦ شموع LED','علبة أو صينية صغيرة للمحابس','كيس ورق ورد']},
      {name:'للحفلة', who:'لحفلة لـ ٣٠ ضيف تقريباً', price:40, items:['لافتة «خطوبة مبروكة» كبيرة','١٢ شمعة LED','علبة أو صينية صغيرة للمحابس','٢ كيس ورق ورد','٢٠ بالون ذهبي وعاجي','٣ زينة لنص الطاولة','٣٠ علبة ملبّس صغيرة للضيوف']},
      {name:'VIP', who:'حفلة كاملة مع زاوية للتصوير', price:75, items:['لافتة «خطوبة مبروكة» كبيرة','١٢ شمعة LED','٢ كيس ورق ورد','٢٠ بالون ذهبي وعاجي','٣ زينة لنص الطاولة','٣٠ علبة ملبّس صغيرة للضيوف','+خلفية للتصوير عليها أساميكن أو عبارة Mr&nbsp;&amp;&nbsp;Mrs','+حروف LED','+صينية مزيّنة للمحابس والملبّس']}]}
  ];

  // ---------- box drawings (viewBox 0 0 320 240): lid propped open behind, things peeking out, the front face on top ----------
  const BULBS = [[103,156],[122,160],[141,158],[160,150],[179,142],[198,140],[217,143]];
  const lights = cols => `<path d="M84 146Q122 172 160 150Q198 128 236 152" fill="none" stroke="#2A2440" stroke-width="1.6" opacity=".7"/>` +
    BULBS.map(([x,y],i) => `<circle cx="${x}" cy="${y+5}" r="9" fill="${cols[i % cols.length]}" opacity=".22"/><circle class="twk" style="--dl:-${(i * .4).toFixed(1)}s" cx="${x}" cy="${y+5}" r="4.5" fill="${cols[i % cols.length]}"/>`).join('');
  const badge = (t, f, w = 112, fs = 13) => `<rect x="${160 - w/2}" y="176" width="${w}" height="26" rx="13" fill="#1C1D3A" opacity=".9"/><text x="160" y="194" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="${fs}" letter-spacing="1.2" fill="${f}">${t}</text>`;
  const shell = (b, items, front, extra = '') => `
    <ellipse cx="160" cy="216" rx="106" ry="10" fill="#05050F" opacity=".35"/>
    <g transform="rotate(-16 80 112)"><rect x="66" y="88" width="184" height="26" rx="6" fill="${b.lid}"/>${b.lidDeco || ''}<rect x="66" y="108" width="184" height="6" rx="3" fill="#000" opacity=".15"/></g>
    <rect x="84" y="108" width="152" height="16" rx="3" fill="${b.inner}"/>
    ${items}
    <rect x="80" y="120" width="160" height="92" rx="7" fill="${b.body}"/>
    ${front}
    <rect x="80" y="120" width="160" height="7" fill="#000" opacity=".14"/>
    ${star4(36, 44, 8, '#EEEAF8', 'class="twk"')}${star4(290, 70, 6, '#EEEAF8', 'class="twk" style="--dl:-1.3s"')}
    ${extra}`;

  const BOX_ART = {
    // mystery: light pouring out of the open box, a big gold "?" rising from it, question marks floating around
    mystery: shell({body:'#3E2C78', inner:'#160F33', lid:'#5B44A8', lidDeco:'<rect x="150" y="88" width="16" height="26" fill="#F2C94C"/>'},
      `<path d="M96 116L64 30h192l-32 86z" fill="#F2C94C" opacity=".12"/><path d="M118 116L104 46h112l-14 70z" fill="#F2C94C" opacity=".14"/>
       <g class="peek" style="--dl:-.8s"><circle cx="160" cy="76" r="34" fill="#F2C94C" opacity=".18"/><text x="160" y="110" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="86" fill="#F2C94C">?</text></g>
       ${star4(112, 74, 7, '#FFF4D6', 'class="twk"')}${star4(212, 64, 9, '#FFF4D6', 'class="twk" style="--dl:-1.1s"')}${star4(200, 104, 5, '#B9A5F5', 'class="twk" style="--dl:-.5s"')}`,
      `<rect x="152" y="120" width="16" height="92" fill="#F2C94C"/>` +
        [[100,148,18],[214,144,-14],[118,196,10],[204,198,-8]].map(([x,y,r]) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="22" fill="#fff" opacity=".22" transform="rotate(${r} ${x} ${y})">?</text>`).join('') +
        badge('MYSTERY BOX', '#F2C94C', 124, 12),
      `<g class="peek" style="--dl:-1.6s"><text x="54" y="100" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="34" fill="#B9A5F5" transform="rotate(-14 54 100)">?</text></g>
       <g class="peek" style="--dl:-2.3s"><text x="272" y="128" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="28" fill="#F5B98D" transform="rotate(12 272 128)">?</text></g>`),

    movie: shell({body:'#D8473F', inner:'#6E1F1B', lid:'#B83A33', lidDeco:[96,126,156,186,216].map(x => `<rect x="${x}" y="88" width="14" height="26" fill="#F7E9D7" opacity=".85"/>`).join('')},
      `<g class="peek" style="--dl:-1.2s"><g transform="rotate(-12 112 100)"><rect x="98" y="58" width="30" height="70" rx="3" fill="#5A3A2E"/><path d="M98 66h30M98 76h30M113 58v20" stroke="#3E271F" stroke-width="1.5"/><rect x="98" y="82" width="30" height="46" rx="2" fill="#F5B98D"/><path d="M98 82l5 4 5-4 5 4 5-4 5 4 5-4" fill="none" stroke="#E9A57A" stroke-width="1.4"/></g></g>
       <g class="peek" style="--dl:-.5s"><path d="M184 72h34l-5 56h-24z" fill="#F3EBDD"/><path d="M185.6 90H216.4L215.3 102H186.7z" fill="#D8473F"/><rect x="181" y="64" width="40" height="9" rx="3" fill="#fff"/><path d="M206 64l10-28" stroke="#FF9D8A" stroke-width="4" stroke-linecap="round"/></g>
       <g class="peek" style="--dl:-2s"><circle cx="158" cy="76" r="11" fill="#FFC86B" opacity=".3"/><path d="M158 66c5 6 6 10 0 14-6-4-5-8 0-14z" fill="#FFC86B"/><rect x="150" y="84" width="16" height="40" rx="3" fill="#F3EBDD"/></g>
       <g class="peek" style="--dl:-.9s">${[[94,116,9],[108,110,11],[124,115,10],[140,109,11],[156,114,10],[172,110,11],[188,115,10],[204,111,11],[220,115,10],[232,118,8],[116,100,7],[146,98,8],[196,100,7]].map(([x,y,r],i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 3 ? '#FFF4D6' : '#F7D774'}"/>`).join('')}</g>`,
      [92,122,152,182,212].map(x => `<rect x="${x}" y="120" width="14" height="92" fill="#F7E9D7" opacity=".9"/>`).join('') + lights(['#F7D774','#FF9D8A','#F3EBDD']) + badge('MOVIE NIGHT', '#F7D774'),
      `<g class="vip"><ellipse cx="62" cy="214" rx="40" ry="6" fill="#05050F" opacity=".3"/><rect x="26" y="168" width="74" height="46" rx="23" fill="#B9A5F5"/><circle cx="92" cy="191" r="23" fill="#CDBDFA"/><path d="M92 191m-3 0a3 3 0 1 1 6 0a8 8 0 1 1-14 0a13 13 0 1 1 24 0a18 18 0 1 1-34 0" fill="none" stroke="#7B66C9" stroke-opacity=".5" stroke-width="1.6"/><rect x="50" y="167" width="10" height="48" rx="2" fill="#F5B98D"/></g>`),

    girls: shell({body:'#F2A7B8', inner:'#8E4B5E', lid:'#E58FA4', lidDeco:'<rect x="150" y="88" width="16" height="26" fill="#B9A5F5"/>'},
      `<g class="peek"><rect x="105" y="52" width="14" height="30" rx="3" fill="#2A2440"/><rect x="102" y="80" width="20" height="6" fill="#2A2440"/><rect x="96" y="84" width="32" height="44" rx="9" fill="#C86B9A"/><rect x="102" y="90" width="5" height="26" rx="2.5" fill="#fff" opacity=".4"/></g>
       <g class="peek" style="--dl:-1s"><circle cx="160" cy="70" r="14" fill="#FFC86B" opacity=".3"/><path d="M160 60c5 6 6 10 0 14-6-4-5-8 0-14z" fill="#FFC86B"/><path d="M160 74v8" stroke="#2A2440" stroke-width="1.5"/><rect x="140" y="80" width="40" height="48" rx="6" fill="#FFF1E6" opacity=".95"/><ellipse cx="160" cy="84" rx="18" ry="4" fill="#F3DCCB"/><rect x="140" y="100" width="40" height="14" fill="#B9A5F5"/></g>
       <g class="peek" style="--dl:-2s"><g transform="rotate(12 206 96)"><rect x="186" y="58" width="40" height="70" rx="6" fill="#B9A5F5"/><path d="M186 66h40" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-dasharray="3 3"/><ellipse cx="206" cy="90" rx="11" ry="14" fill="none" stroke="#fff" stroke-width="2"/><path d="M201 87h3M208 87h3M202 96q4 3 8 0" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></g></g>
       <ellipse cx="230" cy="116" rx="15" ry="8" fill="none" stroke="#F5B98D" stroke-width="7" stroke-dasharray="4 2"/>`,
      `<rect x="152" y="120" width="16" height="92" fill="#B9A5F5"/>` + [[96,136],[226,132],[100,204],[222,206],[132,130]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff" opacity=".45"/>`).join('') + lights(['#F3EBDD','#B9A5F5','#F7D774']) + badge('GIRLS NIGHT', '#F7B8C8', 104),
      `<g class="vip"><path d="M208 188q-10 6-8 20M262 188q8 6 6 20" fill="none" stroke="#9C86EC" stroke-width="3" stroke-linecap="round"/><path d="M208 186c4-10 18-12 26-4 8-8 22-6 26 4 2 12-8 20-18 18-4-1-6-5-8-5s-4 4-8 5c-10 2-20-6-18-18z" fill="#B9A5F5"/><path d="M216 192q6 4 12 0M240 192q6 4 12 0" fill="none" stroke="#2A2440" stroke-width="1.6" stroke-linecap="round"/></g>`),

    // boys: a game controller, a fan of playing cards, a soda can and a bag of chips; VIP adds a travel backgammon board (طاولة زهر)
    boys: shell({body:'#2F5E8F', inner:'#16324F', lid:'#2A527C', lidDeco:'<rect x="150" y="88" width="16" height="26" fill="#7FD6C6"/>'},
      `<g class="peek" style="--dl:-.6s"><g transform="rotate(-10 112 92)"><path d="M88 84q4-14 18-14h12q14 0 18 14l4 22q2 10-8 10-6 0-10-8h-20q-4 8-10 8-10 0-8-10z" fill="#3A3F55"/><path d="M100 86v10M95 91h10" stroke="#7FD6C6" stroke-width="3" stroke-linecap="round"/><circle cx="124" cy="88" r="3" fill="#F5B98D"/><circle cx="131" cy="95" r="3" fill="#9AD35B"/></g></g>
       <g class="peek" style="--dl:-1.4s">${[[-16,'#D8473F','M160 78c-3-4-8-1-5 3l5 5 5-5c3-4-2-7-5-3z'],[0,'#1C1D3A','M160 72l-6 8h4l-2 6h8l-2-6h4z'],[16,'#D8473F','M160 72l6 9-6 9-6-9z']].map(([r,f,d]) => `<g transform="rotate(${r} 160 120)"><rect x="146" y="58" width="28" height="40" rx="3" fill="#FBF6EE" stroke="#C9C4E0"/><path d="${d}" fill="${f}"/></g>`).join('')}</g>
       <g class="peek" style="--dl:-2.1s"><rect x="194" y="68" width="22" height="42" rx="4" fill="#9AD35B"/><rect x="194" y="80" width="22" height="12" fill="#fff" opacity=".5"/><ellipse cx="205" cy="68" rx="11" ry="3" fill="#D6E6CB"/></g>
       <g class="peek" style="--dl:-.9s"><path d="M222 72h30l-2 50h-26z" fill="#F5B98D"/><path d="M222 72l4-6h22l4 6M224 122l2 4h22l2-4" fill="#E9A57A"/><circle cx="237" cy="97" r="8" fill="#F7D774"/></g>`,
      `<rect x="152" y="120" width="16" height="92" fill="#7FD6C6"/>` + [[98,140],[224,136],[104,204],[220,206]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" opacity=".45"/>`).join('') + lights(['#7FD6C6','#9AD35B','#F7D774']) + badge('BOYS NIGHT', '#7FD6C6', 104),
      `<g class="vip"><ellipse cx="62" cy="216" rx="46" ry="5" fill="#05050F" opacity=".3"/><rect x="18" y="166" width="88" height="48" rx="5" fill="#8A5A34"/><rect x="22" y="170" width="80" height="40" rx="3" fill="#E9D3AE"/><path d="M62 170v40" stroke="#8A5A34" stroke-width="3"/>
         ${[0,1,2,3,4,5].map(i => { const x = 25 + i * 6 + (i > 2 ? 10 : 0), f = i % 2 ? '#8A5A34' : '#3C5A63'; return `<path d="M${x} 170l3 15 3-15zM${x} 210l3-15 3 15z" fill="${f}"/>`; }).join('')}
         <rect x="70" y="176" width="12" height="12" rx="2" fill="#fff" stroke="#8A5A34"/><circle cx="73.5" cy="179.5" r="1.3" fill="#2A2440"/><circle cx="78.5" cy="184.5" r="1.3" fill="#2A2440"/><rect x="84" y="186" width="12" height="12" rx="2" fill="#fff" stroke="#8A5A34"/><circle cx="90" cy="192" r="1.4" fill="#2A2440"/></g>`),

    birthday: shell({body:'#8ED8C0', inner:'#2F7A65', lid:'#7CC8AF', lidDeco:'<rect x="150" y="88" width="16" height="26" fill="#F5B98D"/>'},
      `<g class="peek" style="--dl:-.4s"><path d="M106 79q8 22 26 44" fill="none" stroke="#C9C4E0" stroke-width="1.2"/><ellipse cx="104" cy="52" rx="22" ry="27" fill="#F5B98D"/><ellipse cx="96" cy="42" rx="5" ry="9" fill="#fff" opacity=".4"/><path d="M100 78h8l-4 6z" fill="#F5B98D"/></g>
       <g class="peek" style="--dl:-1.4s"><path d="M216 70q-10 26-28 52" fill="none" stroke="#C9C4E0" stroke-width="1.2"/><ellipse cx="216" cy="42" rx="22" ry="27" fill="#B9A5F5"/><ellipse cx="208" cy="32" rx="5" ry="9" fill="#fff" opacity=".4"/><path d="M212 68h8l-4 6z" fill="#B9A5F5"/></g>
       <g class="peek" style="--dl:-2.2s"><path d="M160 92v30" stroke="#C9C4E0" stroke-width="1.2"/><text x="160" y="94" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="74" fill="#E8C26A">1</text></g>
       <g class="peek" style="--dl:-.9s"><path d="M212 126L230 82L248 126z" fill="#F5B98D"/><path d="M219 112H241M225 98H235" stroke="#fff" stroke-opacity=".7" stroke-width="3"/><circle cx="230" cy="82" r="5" fill="#fff"/></g>`,
      `<rect x="152" y="120" width="16" height="92" fill="#F5B98D"/><path d="M84 130Q160 156 236 130" fill="none" stroke="#1C1D3A" stroke-width="1.4" opacity=".6"/>` +
        [0,1,2,3,4,5,6].map(i => { const t = (i + .5) / 7, x = 84 + 152 * t, y = 130 + 52 * t * (1 - t); return `<path d="M${(x-8).toFixed(1)} ${y.toFixed(1)}h16l-8 16z" fill="${['#F5B98D','#B9A5F5','#F5D58D','#FFFFFF'][i % 4]}"/>`; }).join('') +
        [[96,170],[226,166],[110,204],[214,206]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#F5D58D"/>`).join('') + badge('HAPPY BIRTHDAY', '#F5D58D', 138, 11),
      [[64,58,'#F5D58D',20],[252,30,'#B9A5F5',-30],[50,150,'#F5B98D',45],[270,150,'#F5D58D',-15]].map(([x,y,f,r]) => `<rect x="${x}" y="${y}" width="9" height="5" rx="1" fill="${f}" transform="rotate(${r} ${x} ${y})"/>`).join('') +
        `<g class="vip"><path d="M58 114q12 6 24 8M266 106q-14 10-28 16" fill="none" stroke="#C9C4E0" stroke-width="1.2"/><ellipse cx="54" cy="92" rx="18" ry="22" fill="#F5D58D"/><path d="M51 113h6l-3 5z" fill="#F5D58D"/><ellipse cx="268" cy="84" rx="18" ry="22" fill="#F2A7B8"/><path d="M265 105h6l-3 5z" fill="#F2A7B8"/>${star5(160, 30, 10, '#F5D58D')}</g>`),
    // baby: a bottle, two pastel balloons, a rattle and a dummy; VIP adds a big gold star balloon and an "oh baby" topper
    baby: shell({body:'#9CC8EE', inner:'#3D6A92', lid:'#86B5E0', lidDeco:'<rect x="150" y="88" width="16" height="26" fill="#F5B3C4"/>'},
      `<g class="peek" style="--dl:-.4s"><path d="M150 76q4 24 8 46M180 66q-8 30-14 56" fill="none" stroke="#C9C4E0" stroke-width="1.2"/>
         <ellipse cx="150" cy="50" rx="18" ry="22" fill="#A9D2F5"/><ellipse cx="144" cy="41" rx="4" ry="8" fill="#fff" opacity=".45"/><path d="M147 71h6l-3 5z" fill="#A9D2F5"/>
         <ellipse cx="180" cy="40" rx="18" ry="22" fill="#F5B3C4"/><ellipse cx="174" cy="31" rx="4" ry="8" fill="#fff" opacity=".45"/><path d="M177 61h6l-3 5z" fill="#F5B3C4"/></g>
       <g class="peek" style="--dl:-1.2s"><g transform="rotate(-10 112 96)"><path d="M106 53q6-15 12 0z" fill="#F7D9B5"/><rect x="102" y="52" width="20" height="10" rx="2" fill="#F5B3C4"/><rect x="99" y="61" width="26" height="66" rx="8" fill="#FBF6EE"/><rect x="99" y="98" width="26" height="29" fill="#DCEBFA"/><path d="M103 72h7M103 81h7M103 90h7" stroke="#7FAEDB" stroke-width="1.6" stroke-linecap="round"/><path d="M112 106c-3-4-8-1-5 3l5 5 5-5c3-4-2-7-5-3z" fill="#F5B3C4"/></g></g>
       <g class="peek" style="--dl:-2s"><g transform="rotate(14 214 96)"><rect x="210" y="82" width="8" height="44" rx="4" fill="#F5D58D"/><circle cx="214" cy="68" r="17" fill="#F5B3C4"/><path d="M197 68h34" stroke="#fff" stroke-opacity=".6" stroke-width="3"/><circle cx="207" cy="60" r="2.4" fill="#fff"/><circle cx="222" cy="76" r="2.4" fill="#fff"/><circle cx="208" cy="76" r="2" fill="#fff" opacity=".7"/><circle cx="221" cy="60" r="2" fill="#fff" opacity=".7"/></g></g>
       <circle cx="236" cy="102" r="7" fill="none" stroke="#F5D58D" stroke-width="3"/><ellipse cx="236" cy="113" rx="13" ry="7" fill="#A9D2F5"/><circle cx="236" cy="113" r="3" fill="#fff" opacity=".7"/>`,
      `<rect x="152" y="120" width="16" height="92" fill="#F5B3C4"/>` +
        [[94,146],[204,142]].map(([x,y]) => `<g fill="#fff" opacity=".55"><circle cx="${x}" cy="${y}" r="6"/><circle cx="${x+9}" cy="${y-4}" r="8"/><circle cx="${x+18}" cy="${y}" r="6"/><rect x="${x}" y="${y}" width="18" height="6"/></g>`).join('') +
        [[100,206],[222,204],[132,136],[190,166],[120,170]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" opacity=".5"/>`).join('') + badge('OH BABY', '#F5C2CF', 100),
      [[64,40,'#A9D2F5',20],[262,36,'#F5B3C4',-30],[26,192,'#F5D58D',45],[274,148,'#A9D2F5',-15]].map(([x,y,f,r]) => `<rect x="${x}" y="${y}" width="9" height="5" rx="1" fill="${f}" transform="rotate(${r} ${x} ${y})"/>`).join('') +
        `<g class="vip"><path d="M50 141q-8 14 2 26t-2 26" fill="none" stroke="#C9C4E0" stroke-width="1.2"/>
           ${star5(50, 108, 32, '#F5D58D')}<path d="M38 96l8-6" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/><path d="M47 138h6l-3 5z" fill="#E3BC63"/>
           <path d="M262 212v-30M290 212v-30" stroke="#F5D58D" stroke-width="2"/><text x="276" y="184" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-weight="600" font-size="20" fill="#F5D58D">baby</text>
           <path d="M276 164c-3-4-8-1-5 3l5 5 5-5c3-4-2-7-5-3z" fill="#F5B3C4"/></g>`),

    // engagement: roses, an open ring box with two rings, a dish of sugared almonds (ملبّس) and a «مبروك» tag; VIP adds a Mr & Mrs sign and balloons
    engage: shell({body:'#EFE4D2', inner:'#7A5E44', lid:'#E2D2B6', lidDeco:'<rect x="150" y="88" width="16" height="26" fill="#D4AF6A"/>'},
      `<g class="peek" style="--dl:-.6s"><path d="M106 70q4 30 10 54M130 86q-4 20-6 38" fill="none" stroke="#7FA88A" stroke-width="2.4"/><path d="M110 100q-14-4-16 6 12 4 16-6zM125 106q12-6 16 2-10 6-16-2z" fill="#8FB79A"/>
         <circle cx="104" cy="60" r="13" fill="#D99AA5"/><path d="M104 60m-3 0a3 3 0 1 1 6 0a7 7 0 1 1-12 0a10 10 0 1 1 18 1" fill="none" stroke="#B26F7C" stroke-width="1.6"/>
         <circle cx="130" cy="76" r="11" fill="#E8B4BC"/><path d="M130 76m-2 0a2.5 2.5 0 1 1 5 0a6 6 0 1 1-10 0a8.5 8.5 0 1 1 15 1" fill="none" stroke="#C4848F" stroke-width="1.4"/></g>
       <g class="peek" style="--dl:-1.6s"><rect x="146" y="58" width="40" height="28" rx="5" fill="#B86E7D"/><rect x="150" y="62" width="32" height="21" rx="3" fill="#F6EAEC"/><rect x="146" y="86" width="40" height="40" rx="5" fill="#C9808E"/><rect x="146" y="86" width="40" height="5" fill="#000" opacity=".12"/>
         <ellipse cx="166" cy="92" rx="16" ry="5" fill="#F6EAEC"/><circle cx="160" cy="83" r="8" fill="none" stroke="#E6C27A" stroke-width="3.4"/><circle cx="172" cy="84" r="7" fill="none" stroke="#F3DDA6" stroke-width="3"/><path d="M156 74l4-5 4 5-4 4z" fill="#fff"/>${star4(196, 54, 6, '#F5D58D')}</g>
       <g class="peek" style="--dl:-2.4s">${[[206,96,'#FFFDF7'],[218,94,'#F7D9DE'],[230,96,'#FFFDF7'],[212,88,'#FFFDF7'],[225,87,'#EAD9F0'],[219,81,'#FFFDF7']].map(([x,y,f]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4.6" fill="${f}" stroke="#CDBBA0" stroke-width=".8"/>`).join('')}
         <path d="M196 100h44q-4 16-22 16t-22-16z" fill="#D4AF6A"/><ellipse cx="218" cy="100" rx="22" ry="3.5" fill="#B8924E"/></g>`,
      `<rect x="152" y="120" width="16" height="92" fill="#D4AF6A"/>` +
        [[98,192,30],[226,190,-20],[108,132,60],[214,134,-40]].map(([x,y,r]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#D99AA5" opacity=".75" transform="rotate(${r} ${x} ${y})"/>`).join('') +
        lights(['#E6B655','#D98C9A','#C9A06A']) + badge('YES!', '#F3DDA6', 74, 15),
      [[60,48,'#E8B4BC',30],[256,30,'#D99AA5',-20],[40,146,'#E8B4BC',50],[276,200,'#D99AA5',-35]].map(([x,y,f,r]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="${f}" transform="rotate(${r} ${x} ${y})"/>`).join('') +
        `<path d="M236 124q10 0 16 10" fill="none" stroke="#D4AF6A" stroke-width="1.4"/><g transform="rotate(10 278 148)"><rect x="250" y="134" width="58" height="28" rx="6" fill="#F6EAEC"/><circle cx="256" cy="148" r="2.4" fill="#C9808E"/><text x="282" y="154" text-anchor="middle" font-family="El Messiri, serif" font-weight="700" font-size="15" fill="#8A4F5C">مبروك</text></g>
         <g class="vip"><path d="M58 112q12 6 24 8M266 106q-14 10-28 16" fill="none" stroke="#C9C4E0" stroke-width="1.2"/><ellipse cx="54" cy="90" rx="18" ry="22" fill="#E6C27A"/><ellipse cx="48" cy="81" rx="4" ry="8" fill="#fff" opacity=".4"/><path d="M51 111h6l-3 5z" fill="#E6C27A"/><ellipse cx="268" cy="84" rx="18" ry="22" fill="#F3EBDD"/><path d="M265 105h6l-3 5z" fill="#F3EBDD"/>
           <ellipse cx="62" cy="214" rx="44" ry="5" fill="#05050F" opacity=".3"/><path d="M30 196v18M94 196v18" stroke="#B8924E" stroke-width="3"/><rect x="16" y="160" width="92" height="40" rx="8" fill="#C9808E"/><rect x="20" y="164" width="84" height="32" rx="6" fill="none" stroke="#F3DDA6" stroke-width="1.6" stroke-dasharray="0 5" stroke-linecap="round"/>
           <text x="62" y="186" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-weight="600" font-size="17" fill="#FFF8EC">Mr &amp; Mrs</text></g>`)
  };

  // ---------- add-ons (shown on the box pages they suit) ----------
  const LILAC = {name:'ليلكي', c:'#B9A5F5'}, PEACH = {name:'خوخي', c:'#F5B98D'}, PINK = {name:'زهري', c:'#F2A7B8'};
  const ADDONS = [
    {id:'starlights', art:'stars',      name:'سلسلة ضو نجوم',       desc:'نجوم LED ببطاريات، ٣ متر، للشباك أو فوق التلفزيون.', price:6, opts:[{name:'أصفر دافي', c:'#F5D58D'}, LILAC, PINK], tag:'بتحلّي أي سهرة'},
    {id:'numballoon', art:'numballoon', name:'بالون رقم',            desc:'بالون فويل ٨٠ سم. اكتبلنا الرقم بالملاحظات وقت تطلب.', price:3, opts:[{name:'ذهبي', c:'#E3BC63'}, {name:'فضي', c:'#C9CCD8'}, PINK]},
    {id:'ledcandles', art:'candles',    name:'شموع LED',             desc:'٦ شموع بلا نار ولا دخان، ضوها بيرجف متل الشمع الحقيقي.', price:4, opts:[{name:'كريمي', c:'#F3EBDD'}, {name:'ليلكي', c:'#C9B8F8'}, PEACH]},
    {id:'handcard',   art:'card',       name:'كرت إهداء مكتوب بخط اليد', desc:'اكتبلنا شو بدك بالملاحظات، ومنكتبه بخط إيدنا ومنحطه جوّا البوكس.', price:1, opts:[LILAC, PEACH, {name:'نعناعي', c:'#8ED8C0'}]},
    {id:'popcorn',    art:'popcorn',    name:'فشار إضافي',           desc:'كيس فشار كبير جاهز، بيكفي ٤ أشخاص.', price:2, optLabel:'الطعمة', opts:[{name:'مالح'}, {name:'كراميل'}, {name:'جبنة'}]},
    {id:'blanket',    art:'blanket',    name:'بطانية صغيرة',         desc:'بطانية فرو ناعمة ١٢٠×١٥٠ سم، ملفوفة بشريطة.', price:12, opts:[LILAC, {name:'رمادي', c:'#9C99B5'}, PEACH]},
    {id:'mlabbas',    art:'almonds',    name:'علب ملبّس للضيوف ١٢ قطعة', desc:'١٢ علبة صغيرة فيها ملبّس، كل وحدة مربوطة بشريطة. ضيافة حلوة للخطوبة أو للمولود.', price:6, opts:[{name:'ذهبي', c:'#E3BC63'}, {name:'أبيض', c:'#FBF6EE'}]}
  ];
  const FLAVOUR = {'مالح':'#FFF4D6', 'كراميل':'#E2A85C', 'جبنة':'#F6C94C'};
  const taper = x0 => (70 + (x0 - 58) * 60 / 84).toFixed(1);   // popcorn bucket stripes follow the bucket's slope
  const ART = {
    stars: c => `<path d="M10 46Q100 146 190 46" fill="none" stroke="#8B86A8" stroke-width="1.6"/>` +
      [0,1,2,3,4,5].map(i => { const t = (i + .5) / 6, x = +(10 + 180 * t).toFixed(1), y = +(46 + 200 * t * (1 - t)).toFixed(1), l = 16 + (i % 2) * 18;
        return `<path d="M${x} ${y}v${l}" stroke="#8B86A8" stroke-width="1.2"/><circle cx="${x}" cy="${y + l + 12}" r="17" fill="${c}" opacity=".2"/>${star5(x, y + l + 12, 13, c)}`; }).join(''),
    numballoon: c => `<path d="M100 166q-8 10 0 18t0 14" fill="none" stroke="#8B86A8" stroke-width="1.4"/>
      <text x="100" y="160" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="170" fill="${c}">7</text>
      <text x="96" y="156" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="170" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2">7</text>
      ${star4(40, 50, 9, c)}${star4(166, 60, 7, '#fff')}`,
    candles: c => `<ellipse cx="100" cy="172" rx="74" ry="6" fill="#000" opacity=".22"/>` +
      [[46,70],[86,96],[126,60]].map(([x,h]) => { const cx = x + 15, top = 170 - h;
        return `<circle cx="${cx}" cy="${top - 14}" r="14" fill="#FFC86B" opacity=".25"/><path d="M${cx} ${top - 26}c6 8 7 13 0 18-7-5-6-10 0-18z" fill="#FFC86B"/>
          <rect x="${x}" y="${top}" width="30" height="${h}" rx="4" fill="${c}"/><rect x="${x + 5}" y="${top + 8}" width="5" height="${h - 16}" rx="2.5" fill="#fff" opacity=".35"/><ellipse cx="${cx}" cy="${top}" rx="15" ry="4" fill="#000" opacity=".12"/>`; }).join(''),
    card: c => `<g transform="rotate(8 100 110)"><rect x="40" y="60" width="124" height="88" rx="6" fill="${c}"/><path d="M40 64l62 46 62-46" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/></g>
      <g transform="rotate(-7 100 110)"><rect x="34" y="70" width="120" height="84" rx="6" fill="#FBF6EE"/>
        <text x="94" y="104" text-anchor="middle" font-family="El Messiri, serif" font-weight="700" font-size="20" fill="#5B4FA0">سهرة حلوة</text>
        <path d="M54 122q10-6 20 0t20 0 20 0 20 0M60 138q10-5 20 0t20 0 18 0" fill="none" stroke="#9A90C8" stroke-width="1.6" stroke-linecap="round"/>${star5(136, 86, 7, c)}</g>`,
    popcorn: (c, o) => { const k = FLAVOUR[o && o.name] || '#FFF4D6';
      return `<ellipse cx="100" cy="184" rx="44" ry="5" fill="#000" opacity=".22"/>` +
        [[48,78,12],[66,66,14],[86,58,15],[106,56,15],[126,62,14],[146,74,12],[60,86,12],[80,80,13],[100,76,14],[120,80,13],[140,88,11],[96,44,10],[74,50,9],[120,46,9]]
          .map(([x,y,r],i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${k}"/>${i % 3 ? '' : `<circle cx="${x - r/3}" cy="${y - r/3}" r="${r/3}" fill="#fff" opacity=".5"/>`}`).join('') +
        `<path d="M58 92H142L130 182H70z" fill="#D8473F"/>` +
        [66,90,114].map(x => `<path d="M${x} 92h12L${taper(x + 12)} 182H${taper(x)}z" fill="#FBF3E4"/>`).join('') +
        `<path d="M58 92H142" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`; },
    blanket: c => `<ellipse cx="100" cy="166" rx="78" ry="8" fill="#000" opacity=".22"/>
      <rect x="26" y="88" width="128" height="72" rx="36" fill="${c}"/><rect x="26" y="124" width="128" height="36" rx="18" fill="#000" opacity=".12"/>
      <circle cx="148" cy="124" r="36" fill="${c}"/><circle cx="148" cy="124" r="36" fill="#fff" opacity=".12"/>
      <path d="M148 124m-4 0a4 4 0 1 1 8 0a10 10 0 1 1-18 0a16 16 0 1 1 30 0a22 22 0 1 1-42 0a28 28 0 1 1 52 2" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2"/>
      <rect x="72" y="86" width="14" height="76" rx="3" fill="#F5B98D"/>`,
    // two small favour boxes with a ribbon and bow, sugared almonds in front
    almonds: c => { const box = (x, y, w, h) => { const m = x + w / 2;
        return `<rect x="${x}" y="${y + 12}" width="${w}" height="${h - 12}" rx="3" fill="${c}"/><rect x="${x}" y="${y + 12}" width="${w}" height="${h - 12}" rx="3" fill="#000" opacity=".08"/>
          <rect x="${x - 4}" y="${y}" width="${w + 8}" height="14" rx="3" fill="${c}"/><rect x="${m - 4}" y="${y}" width="8" height="${h}" fill="#D98C9A"/>
          <path d="M${m} ${y}c-6-12-22-12-18-2 3 6 12 4 18 2zM${m} ${y}c6-12 22-12 18-2-3 6-12 4-18 2z" fill="#D98C9A"/><circle cx="${m}" cy="${y}" r="3.5" fill="#B86E7D"/>`; };
      return `<ellipse cx="100" cy="174" rx="80" ry="6" fill="#000" opacity=".22"/>` + box(36, 96, 54, 62) + box(110, 76, 58, 82) +
        [[46,166],[64,170],[82,165],[100,171],[118,166],[136,171],[154,166]].map(([x,y],i) =>
          `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="${['#FFFDF7','#F7D9DE','#FFFDF7','#EAD9F0'][i % 4]}" stroke="#CDBBA0" stroke-width="1"/><ellipse cx="${x - 3}" cy="${y - 2}" rx="3" ry="1.6" fill="#fff" opacity=".8"/>`).join(''); }
  };
  const DEF = {stars:'#F5D58D', numballoon:'#E3BC63', candles:'#F3EBDD', card:'#B9A5F5', blanket:'#B9A5F5', almonds:'#E3BC63'};

  // ---------- which add-ons go with which box, the two colours each box is mixed from, its page ----------
  const ADDONS_FOR = {
    mystery:['handcard','starlights','ledcandles'],
    movie:['popcorn','blanket','starlights','ledcandles','handcard'],
    girls:['ledcandles','starlights','blanket','handcard'],
    boys:['popcorn','starlights','handcard'],
    birthday:['numballoon','starlights','ledcandles','handcard'],
    baby:['mlabbas','starlights','ledcandles','handcard'],
    engage:['mlabbas','ledcandles','starlights','handcard']
  };
  const MIX = {mystery:['#6E56CF','#F2B544'], movie:['#E0574C','#F2B544'], girls:['#F29BB8','#B9A5F5'], boys:['#3C8DD6','#3CC6B0'], birthday:['#8ED8C0','#F5B98D'], baby:['#9CC8EE','#F5B3C4'], engage:['#E6C27A','#E8B4BC']};
  const FILE = id => `box-${id === 'engage' ? 'engagement' : id}.html`;
  const art = b => `<svg viewBox="0 0 320 240" width="320" height="240" role="img" aria-label="بوكس ${b.name}">${BOX_ART[b.id]}</svg>`;
  const mixStyle = b => `--m1:${MIX[b.id][0]};--m2:${MIX[b.id][1]}`;

  // the hub: one tile per box in its own colour mix; it grows into the box page (same view-transition-name)
  function hub(el){
    // the mystery box leads as a wide tile, so the other six sit in full rows
    el.innerHTML = BOXES.map(b => `<a class="bxt reveal${b.mystery ? ' feature' : ''}" href="${FILE(b.id)}" style="${mixStyle(b)};view-transition-name:bx-${b.id}">
      <div class="bxt-art">${b.tag ? `<span class="p-tag">${b.tag}</span>` : ''}${art(b)}</div>
      <div class="bxt-info"><span class="latin">${b.latin}</span><h3>بوكس ${b.name}</h3>${b.mystery ? `<small class="bxt-desc">${b.desc}</small>` : ''}<p>من ${DC.money(b.sizes[0].price)}</p></div></a>`).join('');
  }

  // a box page: hero, the three sizes side by side, the add-ons that suit this box, the other boxes
  function page(id){
    const b = BOXES.find(x => x.id === id), prices = b.sizes.map(s => s.price);
    document.getElementById('bxHero').innerHTML = `<div class="wrap bx-hero-grid">
      <div>
        <a class="crumb" href="night-vibe-box.html">→ <b class="latin">Night Vibe Box</b> · كل البوكسات</a>
        <span class="latin bx-latin-name">${b.latin}</span>
        <h1 id="heroTitle">بوكس ${b.name}</h1>
        <p class="lede">${b.desc}</p>
        <p class="bx-from">من <b class="num">${DC.money(Math.min(...prices))}</b> لـ <b class="num">${DC.money(Math.max(...prices))}</b> تقريباً</p>
        <div class="ctas"><a class="btn solid" href="#sizes">${b.mystery ? 'اختار ميزانيتك' : 'اختار الحجم'}</a><button class="btn ghost" type="button" data-cart>شوف السلة</button></div>
        <div class="code-chip">خصم ٢٠٪ على أول بوكس <b>NIGHT20</b><button type="button" data-copy-code="NIGHT20">انسخ وطبّق</button></div>
      </div>
      <div class="bx-stage" style="${mixStyle(b)};view-transition-name:bx-${b.id}" aria-hidden="true">${art(b)}</div></div>`;

    if (b.mystery) mystery(b); else sizes(b);

    DC.renderGrid(document.getElementById('grid'), 'night', ADDONS.filter(a => ADDONS_FOR[id].includes(a.id)), (p, o) => ART[p.art]((o && o.c) || DEF[p.art], o));
    document.getElementById('others').innerHTML = BOXES.filter(x => x.id !== id).map(x =>
      `<a class="other" href="${FILE(x.id)}" style="${mixStyle(x)}"><i></i><span>بوكس ${x.name}</span></a>`).join('');
  }

  function sizes(b){
    const grid = document.getElementById('sizeGrid');
    grid.innerHTML = b.sizes.map((s, i) => `<article class="sz reveal${i === 1 ? ' best' : ''}" data-i="${i}">
      ${i === 1 ? '<span class="p-tag">الأكثر طلباً</span>' : ''}
      <div><h3>${s.name}</h3><p class="who">${s.who}</p></div>
      <p class="price num">${DC.money(s.price)} <small>تقريباً</small></p>
      <ul class="bx-list">${s.items.map(t => t[0] === '+' ? `<li class="plus">${t.slice(1)} <em>${s.name}</em></li>` : `<li>${t}</li>`).join('')}</ul>
      <button class="add" type="button">أضف البوكس للسلة</button></article>`).join('');
    grid.addEventListener('click', e => {
      const btn = e.target.closest('.add'); if (!btn) return;
      const s = b.sizes[+btn.closest('.sz').dataset.i];
      DC.add({w:'night', id:b.id, name:'بوكس ' + b.name, opt:s.name, price:s.price}, btn);
      btn.textContent = 'انضاف ✓'; btn.classList.add('done');
      setTimeout(() => { btn.textContent = 'أضف البوكس للسلة'; btn.classList.remove('done'); }, 1400);
    });
  }

  // the mystery box: two choices (budget, who it's for); the box on the stage shakes when it goes into the cart
  const WHO = ['ولد', 'بنت'];
  const OWN_MIN = 25;   // the lowest budget a customer may type for their own amount
  function mystery(b){
    const el = document.getElementById('mxPick'), pick = {s:null, g:null}, OWN = b.sizes.length;
    const chips = (key, list) => list.map((t, i) => `<button class="mx-chip" type="button" data-${key}="${i}" aria-pressed="false">${t}</button>`).join('');
    el.innerHTML = `<div class="mx">
      <fieldset class="mx-step" data-step="s"><legend><span class="mx-n">١</span>قديش ميزانيتك؟</legend>
        <div class="mx-budgets">${b.sizes.map((s, i) => `<button class="mx-budget" type="button" data-s="${i}" aria-pressed="false"><b class="num">${DC.money(s.price)}</b><span>${s.name}</span><small>${s.who}</small></button>`).join('')}
          <button class="mx-budget mx-own" type="button" data-s="${OWN}" aria-pressed="false"><b>ميزانيتك إنت</b><span>إنت بتحدّد المبلغ</span><small>من ${DC.money(OWN_MIN)} وطالع</small></button></div>
        <div class="mx-own-row" hidden><label for="mxAmount">قديش بدك تكون ميزانيتك؟</label>
          <div class="mx-amount"><input id="mxAmount" inputmode="decimal" autocomplete="off" maxlength="6" placeholder="مثلاً ٣٥"><span class="latin">$</span></div>
          <small class="mx-hint">أقل ميزانية ${DC.money(OWN_MIN)}</small></div></fieldset>
      <fieldset class="mx-step" data-step="g"><legend><span class="mx-n">٢</span>البوكس لولد ولا لبنت؟</legend><div class="mx-chips">${chips('g', WHO)}</div></fieldset>
      <div class="mx-go"><p class="mx-sum" aria-live="polite"></p><button class="btn solid mx-add" type="button">أضف المفاجأة للسلة</button></div>
      <p class="mx-promise">منختار الهدايا حسب لمين البوكس، قيمتها أكتر من يلي دفعتو، ومنلفّها بتغليف <span class="latin">D&amp;S</span>. وإذا في شي ما بيحبو أو عندو حساسية، اكتبلنا بالملاحظات بالسلة.</p></div>`;
    const sum = el.querySelector('.mx-sum'), row = el.querySelector('.mx-own-row'), input = el.querySelector('#mxAmount'), hint = el.querySelector('.mx-hint');
    // the typed amount, Arabic digits and comma accepted; NaN while it's empty or not a number
    const amount = () => { const v = parseFloat(input.value.trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[٫,]/g, '.')); return isFinite(v) ? Math.round(v) : NaN; };
    const budget = () => pick.s == null ? null : pick.s < OWN ? b.sizes[pick.s] : amount() >= OWN_MIN ? {name:'بميزانية خاصة', price:amount(), own:true} : null;
    const show = () => {
      const bud = budget();
      const miss = [!bud && (pick.s === OWN ? `ميزانيتك (أقل شي ${DC.money(OWN_MIN)})` : 'الميزانية'), pick.g == null && 'لمين'].filter(Boolean);
      sum.textContent = miss.length ? 'باقي تختار: ' + miss.join('، ') : `مفاجأة ${bud.name} بـ ${DC.money(bud.price)} ل${WHO[pick.g]}. شو جوّا؟ ما رح نقلك!`;
      const v = amount();
      hint.classList.toggle('bad', input.value.trim() !== '' && !(v >= OWN_MIN));
      hint.textContent = input.value.trim() !== '' && !(v >= OWN_MIN) ? `الميزانية لازم تكون ${DC.money(OWN_MIN)} أو أكتر` : `أقل ميزانية ${DC.money(OWN_MIN)}`;
    };
    input.addEventListener('input', () => { if (amount() >= OWN_MIN) el.querySelector('[data-step="s"]').classList.remove('need'); show(); });
    show();
    el.addEventListener('click', e => {
      const o = e.target.closest('[data-s],[data-g]');
      if (o) {
        const key = o.dataset.s != null ? 's' : 'g';
        pick[key] = +o.dataset[key];
        o.parentElement.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === o)));
        if (key === 's') { row.hidden = pick.s !== OWN; if (pick.s === OWN) input.focus(); }
        if (key !== 's' || budget()) o.closest('.mx-step').classList.remove('need');
        return show();
      }
      const btn = e.target.closest('.mx-add'); if (!btn) return;
      const miss = ['s', 'g'].filter(k => k === 's' ? !budget() : pick[k] == null);
      if (miss.length) {
        if (miss[0] === 's' && pick.s === OWN) input.focus();
        miss.forEach(k => { const f = el.querySelector(`[data-step="${k}"]`); f.classList.remove('need'); void f.offsetWidth; f.classList.add('need'); });
        el.querySelector(`[data-step="${miss[0]}"]`).scrollIntoView({behavior:DC.reduce ? 'auto' : 'smooth', block:'center'});
        return;
      }
      const s = budget();
      DC.add({w:'night', id:'mystery', name:'بوكس المفاجأة', opt:`${s.own ? 'ميزانية خاصة ' + DC.money(s.price) : s.name} · ${WHO[pick.g]}`, price:s.price}, btn);
      const stage = document.querySelector('.bx-stage'); stage.classList.remove('jiggle'); void stage.offsetWidth; stage.classList.add('jiggle');
      btn.textContent = 'انضافت المفاجأة ✓'; btn.classList.add('done');
      setTimeout(() => { btn.textContent = 'أضف المفاجأة للسلة'; btn.classList.remove('done'); }, 1600);
    });
  }

  window.DCBoxes = {hub, page, BOXES};
})();
