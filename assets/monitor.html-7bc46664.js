const s=JSON.parse(`{"key":"v-9a249a36","path":"/posts/Program_language/shell/monitor.html","title":"","lang":"zh-CN","frontmatter":{"description":"监控某个进程的内存 function getPhyMem { MEMUsage=$(ps -o rss -p $1|grep -v RSS) MEM=$(expr $MEMUsage + 0) num=1024 local MEMUsageMB=$(awk 'BEGIN{printf \\"%.2f\\\\n\\",'$MEM'/'$num'}') if (( $(echo \\"$MEMUsageMB &gt; $MemPhyMem\\"|bc -l) ));then MemPhyMem=$MEMUsageMB fi echo \\"process $1 current phy mem is \\" $MEMUsageMB \\" MB\\" } function getVirtMem { MEMUsage=$(ps -o vsz -p $1|grep -v VSZ) MEM=$(expr $MEMUsage + 0) num=1024 local MEMUsageMB=$(awk 'BEGIN{printf \\"%.2f\\\\n\\",'$MEM'/'$num'}') if (( $(echo \\"$MEMUsageMB &gt; $MemVirtMem\\"|bc -l) ));then MemVirtMem=$MEMUsageMB fi echo \\"process $1 current virt mem is \\" $MEMUsageMB \\" MB\\" } MemPhyMem=0.0 MemVirtMem=0.0 while (true) do getPhyMem $1 getVirtMem $1 echo \\"process $1 peak phy mem is \\" $MemPhyMem \\" MB\\" echo \\"process $1 peak virt mem is \\" $MemVirtMem \\" MB\\" sleep 1s done","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/shell/monitor.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:description","content":"监控某个进程的内存 function getPhyMem { MEMUsage=$(ps -o rss -p $1|grep -v RSS) MEM=$(expr $MEMUsage + 0) num=1024 local MEMUsageMB=$(awk 'BEGIN{printf \\"%.2f\\\\n\\",'$MEM'/'$num'}') if (( $(echo \\"$MEMUsageMB &gt; $MemPhyMem\\"|bc -l) ));then MemPhyMem=$MEMUsageMB fi echo \\"process $1 current phy mem is \\" $MEMUsageMB \\" MB\\" } function getVirtMem { MEMUsage=$(ps -o vsz -p $1|grep -v VSZ) MEM=$(expr $MEMUsage + 0) num=1024 local MEMUsageMB=$(awk 'BEGIN{printf \\"%.2f\\\\n\\",'$MEM'/'$num'}') if (( $(echo \\"$MEMUsageMB &gt; $MemVirtMem\\"|bc -l) ));then MemVirtMem=$MEMUsageMB fi echo \\"process $1 current virt mem is \\" $MEMUsageMB \\" MB\\" } MemPhyMem=0.0 MemVirtMem=0.0 while (true) do getPhyMem $1 getVirtMem $1 echo \\"process $1 peak phy mem is \\" $MemPhyMem \\" MB\\" echo \\"process $1 peak virt mem is \\" $MemVirtMem \\" MB\\" sleep 1s done"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-19T08:27:29.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-19T08:27:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-19T08:27:29.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1697704049000,"updatedTime":1697704049000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.45,"words":134},"filePathRelative":"posts/Program_language/shell/monitor.md","localizedDate":"2023年10月19日","excerpt":"<p>监控某个进程的内存</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token keyword\\">function</span> <span class=\\"token function-name function\\">getPhyMem</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token assign-left variable\\">MEMUsage</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">ps</span> <span class=\\"token parameter variable\\">-o</span> rss <span class=\\"token parameter variable\\">-p</span> $1<span class=\\"token operator\\">|</span><span class=\\"token function\\">grep</span> <span class=\\"token parameter variable\\">-v</span> RSS<span class=\\"token variable\\">)</span></span>\\n    <span class=\\"token assign-left variable\\">MEM</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">expr</span> $MEMUsage + <span class=\\"token number\\">0</span><span class=\\"token variable\\">)</span></span>\\n    <span class=\\"token assign-left variable\\">num</span><span class=\\"token operator\\">=</span><span class=\\"token number\\">1024</span>\\n    <span class=\\"token builtin class-name\\">local</span> <span class=\\"token assign-left variable\\">MEMUsageMB</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">awk</span> <span class=\\"token string\\">'BEGIN{printf \\"%.2f\\\\n\\",'</span>$MEM<span class=\\"token string\\">'/'</span>$num<span class=\\"token string\\">'}'</span><span class=\\"token variable\\">)</span></span>\\n\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token variable\\"><span class=\\"token punctuation\\">((</span> $<span class=\\"token punctuation\\">(</span>echo \\"$MEMUsageMB <span class=\\"token operator\\">&gt;</span> $MemPhyMem\\"<span class=\\"token operator\\">|</span>bc <span class=\\"token operator\\">-</span>l<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">))</span></span><span class=\\"token punctuation\\">;</span><span class=\\"token keyword\\">then</span>\\n        <span class=\\"token assign-left variable\\">MemPhyMem</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\">$MEMUsageMB</span>\\n    <span class=\\"token keyword\\">fi</span>\\n    <span class=\\"token builtin class-name\\">echo</span> <span class=\\"token string\\">\\"process <span class=\\"token variable\\">$1</span> current phy mem is \\"</span> <span class=\\"token variable\\">$MEMUsageMB</span> <span class=\\"token string\\">\\" MB\\"</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function-name function\\">getVirtMem</span>\\n<span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token assign-left variable\\">MEMUsage</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">ps</span> <span class=\\"token parameter variable\\">-o</span> vsz <span class=\\"token parameter variable\\">-p</span> $1<span class=\\"token operator\\">|</span><span class=\\"token function\\">grep</span> <span class=\\"token parameter variable\\">-v</span> VSZ<span class=\\"token variable\\">)</span></span>\\n    <span class=\\"token assign-left variable\\">MEM</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">expr</span> $MEMUsage + <span class=\\"token number\\">0</span><span class=\\"token variable\\">)</span></span>\\n    <span class=\\"token assign-left variable\\">num</span><span class=\\"token operator\\">=</span><span class=\\"token number\\">1024</span>\\n    <span class=\\"token builtin class-name\\">local</span> <span class=\\"token assign-left variable\\">MEMUsageMB</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">awk</span> <span class=\\"token string\\">'BEGIN{printf \\"%.2f\\\\n\\",'</span>$MEM<span class=\\"token string\\">'/'</span>$num<span class=\\"token string\\">'}'</span><span class=\\"token variable\\">)</span></span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token variable\\"><span class=\\"token punctuation\\">((</span> $<span class=\\"token punctuation\\">(</span>echo \\"$MEMUsageMB <span class=\\"token operator\\">&gt;</span> $MemVirtMem\\"<span class=\\"token operator\\">|</span>bc <span class=\\"token operator\\">-</span>l<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">))</span></span><span class=\\"token punctuation\\">;</span><span class=\\"token keyword\\">then</span>\\n        <span class=\\"token assign-left variable\\">MemVirtMem</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\">$MEMUsageMB</span>\\n    <span class=\\"token keyword\\">fi</span>\\n\\n    <span class=\\"token builtin class-name\\">echo</span> <span class=\\"token string\\">\\"process <span class=\\"token variable\\">$1</span> current virt mem is \\"</span> <span class=\\"token variable\\">$MEMUsageMB</span> <span class=\\"token string\\">\\" MB\\"</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token assign-left variable\\">MemPhyMem</span><span class=\\"token operator\\">=</span><span class=\\"token number\\">0.0</span>\\n<span class=\\"token assign-left variable\\">MemVirtMem</span><span class=\\"token operator\\">=</span><span class=\\"token number\\">0.0</span>\\n\\n<span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>true<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">do</span>\\n    getPhyMem <span class=\\"token variable\\">$1</span>\\n    getVirtMem <span class=\\"token variable\\">$1</span>\\n    <span class=\\"token builtin class-name\\">echo</span> <span class=\\"token string\\">\\"process <span class=\\"token variable\\">$1</span> peak phy mem is \\"</span> <span class=\\"token variable\\">$MemPhyMem</span> <span class=\\"token string\\">\\" MB\\"</span>\\n    <span class=\\"token builtin class-name\\">echo</span> <span class=\\"token string\\">\\"process <span class=\\"token variable\\">$1</span> peak virt mem is \\"</span> <span class=\\"token variable\\">$MemVirtMem</span> <span class=\\"token string\\">\\" MB\\"</span>\\n    <span class=\\"token function\\">sleep</span> 1s\\n<span class=\\"token keyword\\">done</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{s as data};
