const s=JSON.parse(`{"key":"v-6cf506de","path":"/posts/tool/linux-cmd/linux-sar-cmd.html","title":"sar","lang":"zh-CN","frontmatter":{"description":"sar sar –n DEV查看网络流量 sar –n DEV 1 2 $ cat monitor_net.sh ############################################################ #!/bin/bash ethn=$1 while true do RX_pre=$(cat /proc/net/dev | grep $ethn | sed 's/:/ /g' | awk '{print $2}') TX_pre=$(cat /proc/net/dev | grep $ethn | sed 's/:/ /g' | awk '{print $10}') sleep 1 RX_next=$(cat /proc/net/dev | grep $ethn | sed 's/:/ /g' | awk '{print $2}') TX_next=$(cat /proc/net/dev | grep $ethn | sed 's/:/ /g' | awk '{print $10}') clear echo -e \\"\\\\t RX \`date +%k:%M:%S\` TX\\" RX=$((\${RX_next}-\${RX_pre})) TX=$((\${TX_next}-\${TX_pre})) if [[ $RX -lt 1024 ]];then RX=\\"\${RX}B/s\\" elif [[ $RX -gt 1048576 ]];then RX=$(echo $RX | awk '{print $1/1048576 \\"MB/s\\"}') else RX=$(echo $RX | awk '{print $1/1024 \\"KB/s\\"}') fi if [[ $TX -lt 1024 ]];then TX=\\"\${TX}B/s\\" elif [[ $TX -gt 1048576 ]];then TX=$(echo $TX | awk '{print $1/1048576 \\"MB/s\\"}') else TX=$(echo $TX | awk '{print $1/1024 \\"KB/s\\"}') fi echo -e \\"$ethn \\\\t $RX $TX \\" done ############################################################","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/tool/linux-cmd/linux-sar-cmd.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"sar"}],["meta",{"property":"og:description","content":"sar sar –n DEV查看网络流量 sar –n DEV 1 2 $ cat monitor_net.sh ############################################################ #!/bin/bash ethn=$1 while true do RX_pre=$(cat /proc/net/dev | grep $ethn | sed 's/:/ /g' | awk '{print $2}') TX_pre=$(cat /proc/net/dev | grep $ethn | sed 's/:/ /g' | awk '{print $10}') sleep 1 RX_next=$(cat /proc/net/dev | grep $ethn | sed 's/:/ /g' | awk '{print $2}') TX_next=$(cat /proc/net/dev | grep $ethn | sed 's/:/ /g' | awk '{print $10}') clear echo -e \\"\\\\t RX \`date +%k:%M:%S\` TX\\" RX=$((\${RX_next}-\${RX_pre})) TX=$((\${TX_next}-\${TX_pre})) if [[ $RX -lt 1024 ]];then RX=\\"\${RX}B/s\\" elif [[ $RX -gt 1048576 ]];then RX=$(echo $RX | awk '{print $1/1048576 \\"MB/s\\"}') else RX=$(echo $RX | awk '{print $1/1024 \\"KB/s\\"}') fi if [[ $TX -lt 1024 ]];then TX=\\"\${TX}B/s\\" elif [[ $TX -gt 1048576 ]];then TX=$(echo $TX | awk '{print $1/1048576 \\"MB/s\\"}') else TX=$(echo $TX | awk '{print $1/1024 \\"KB/s\\"}') fi echo -e \\"$ethn \\\\t $RX $TX \\" done ############################################################"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-15T05:26:28.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-15T05:26:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"sar\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-08-15T05:26:28.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"sar –n DEV查看网络流量","slug":"sar-–n-dev查看网络流量","link":"#sar-–n-dev查看网络流量","children":[]}],"git":{"createdTime":1692077188000,"updatedTime":1692077188000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.57,"words":170},"filePathRelative":"posts/tool/linux-cmd/linux-sar-cmd.md","localizedDate":"2023年8月15日","excerpt":"<h1> sar</h1>\\n<h2> sar –n DEV查看网络流量</h2>\\n<p>sar –n DEV  1 2</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code>$  <span class=\\"token function\\">cat</span>  monitor_net.sh\\n<span class=\\"token comment\\">############################################################</span>\\n<span class=\\"token comment\\">#!/bin/bash</span>\\n\\n<span class=\\"token assign-left variable\\">ethn</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\">$1</span>\\n\\n<span class=\\"token keyword\\">while</span> <span class=\\"token boolean\\">true</span>\\n<span class=\\"token keyword\\">do</span>\\n  <span class=\\"token assign-left variable\\">RX_pre</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">cat</span> /proc/net/dev <span class=\\"token operator\\">|</span> <span class=\\"token function\\">grep</span> $ethn <span class=\\"token operator\\">|</span> <span class=\\"token function\\">sed</span> <span class=\\"token string\\">'s/:/ /g'</span> <span class=\\"token operator\\">|</span> <span class=\\"token function\\">awk</span> <span class=\\"token string\\">'{print $2}'</span><span class=\\"token variable\\">)</span></span>\\n  <span class=\\"token assign-left variable\\">TX_pre</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">cat</span> /proc/net/dev <span class=\\"token operator\\">|</span> <span class=\\"token function\\">grep</span> $ethn <span class=\\"token operator\\">|</span> <span class=\\"token function\\">sed</span> <span class=\\"token string\\">'s/:/ /g'</span> <span class=\\"token operator\\">|</span> <span class=\\"token function\\">awk</span> <span class=\\"token string\\">'{print $10}'</span><span class=\\"token variable\\">)</span></span>\\n  <span class=\\"token function\\">sleep</span> <span class=\\"token number\\">1</span>\\n  <span class=\\"token assign-left variable\\">RX_next</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">cat</span> /proc/net/dev <span class=\\"token operator\\">|</span> <span class=\\"token function\\">grep</span> $ethn <span class=\\"token operator\\">|</span> <span class=\\"token function\\">sed</span> <span class=\\"token string\\">'s/:/ /g'</span> <span class=\\"token operator\\">|</span> <span class=\\"token function\\">awk</span> <span class=\\"token string\\">'{print $2}'</span><span class=\\"token variable\\">)</span></span>\\n  <span class=\\"token assign-left variable\\">TX_next</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token function\\">cat</span> /proc/net/dev <span class=\\"token operator\\">|</span> <span class=\\"token function\\">grep</span> $ethn <span class=\\"token operator\\">|</span> <span class=\\"token function\\">sed</span> <span class=\\"token string\\">'s/:/ /g'</span> <span class=\\"token operator\\">|</span> <span class=\\"token function\\">awk</span> <span class=\\"token string\\">'{print $10}'</span><span class=\\"token variable\\">)</span></span>\\n\\n  <span class=\\"token function\\">clear</span>\\n  <span class=\\"token builtin class-name\\">echo</span> <span class=\\"token parameter variable\\">-e</span> <span class=\\"token string\\">\\"<span class=\\"token entity\\" title=\\"\\\\t\\">\\\\t</span> RX <span class=\\"token variable\\"><span class=\\"token variable\\">\`</span><span class=\\"token function\\">date</span> +%k:%M:%S<span class=\\"token variable\\">\`</span></span> TX\\"</span>\\n\\n  <span class=\\"token assign-left variable\\">RX</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$((</span>\${RX_next}<span class=\\"token operator\\">-</span>\${RX_pre}<span class=\\"token variable\\">))</span></span>\\n  <span class=\\"token assign-left variable\\">TX</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$((</span>\${TX_next}<span class=\\"token operator\\">-</span>\${TX_pre}<span class=\\"token variable\\">))</span></span>\\n\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">[</span> <span class=\\"token variable\\">$RX</span> <span class=\\"token parameter variable\\">-lt</span> <span class=\\"token number\\">1024</span> <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span><span class=\\"token keyword\\">then</span>\\n    <span class=\\"token assign-left variable\\">RX</span><span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"<span class=\\"token variable\\">\${RX}</span>B/s\\"</span>\\n  <span class=\\"token keyword\\">elif</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">[</span> <span class=\\"token variable\\">$RX</span> <span class=\\"token parameter variable\\">-gt</span> <span class=\\"token number\\">1048576</span> <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span><span class=\\"token keyword\\">then</span>\\n    <span class=\\"token assign-left variable\\">RX</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token builtin class-name\\">echo</span> $RX <span class=\\"token operator\\">|</span> <span class=\\"token function\\">awk</span> <span class=\\"token string\\">'{print $1/1048576 \\"MB/s\\"}'</span><span class=\\"token variable\\">)</span></span>\\n  <span class=\\"token keyword\\">else</span>\\n    <span class=\\"token assign-left variable\\">RX</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token builtin class-name\\">echo</span> $RX <span class=\\"token operator\\">|</span> <span class=\\"token function\\">awk</span> <span class=\\"token string\\">'{print $1/1024 \\"KB/s\\"}'</span><span class=\\"token variable\\">)</span></span>\\n  <span class=\\"token keyword\\">fi</span>\\n\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">[</span> <span class=\\"token variable\\">$TX</span> <span class=\\"token parameter variable\\">-lt</span> <span class=\\"token number\\">1024</span> <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span><span class=\\"token keyword\\">then</span>\\n    <span class=\\"token assign-left variable\\">TX</span><span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"<span class=\\"token variable\\">\${TX}</span>B/s\\"</span>\\n  <span class=\\"token keyword\\">elif</span> <span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">[</span> <span class=\\"token variable\\">$TX</span> <span class=\\"token parameter variable\\">-gt</span> <span class=\\"token number\\">1048576</span> <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span><span class=\\"token keyword\\">then</span>\\n    <span class=\\"token assign-left variable\\">TX</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token builtin class-name\\">echo</span> $TX <span class=\\"token operator\\">|</span> <span class=\\"token function\\">awk</span> <span class=\\"token string\\">'{print $1/1048576 \\"MB/s\\"}'</span><span class=\\"token variable\\">)</span></span>\\n  <span class=\\"token keyword\\">else</span>\\n    <span class=\\"token assign-left variable\\">TX</span><span class=\\"token operator\\">=</span><span class=\\"token variable\\"><span class=\\"token variable\\">$(</span><span class=\\"token builtin class-name\\">echo</span> $TX <span class=\\"token operator\\">|</span> <span class=\\"token function\\">awk</span> <span class=\\"token string\\">'{print $1/1024 \\"KB/s\\"}'</span><span class=\\"token variable\\">)</span></span>\\n  <span class=\\"token keyword\\">fi</span>\\n\\n  <span class=\\"token builtin class-name\\">echo</span> <span class=\\"token parameter variable\\">-e</span> <span class=\\"token string\\">\\"<span class=\\"token variable\\">$ethn</span> <span class=\\"token entity\\" title=\\"\\\\t\\">\\\\t</span> <span class=\\"token variable\\">$RX</span>   <span class=\\"token variable\\">$TX</span> \\"</span>\\n\\n<span class=\\"token keyword\\">done</span>\\n<span class=\\"token comment\\">############################################################</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{s as data};
