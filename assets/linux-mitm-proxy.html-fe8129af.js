const t=JSON.parse('{"key":"v-a4d681e4","path":"/posts/tool/linux-tool/linux-mitm-proxy.html","title":"mitmproxy","lang":"zh-CN","frontmatter":{"category":["Linux","tool"],"description":"mitmproxy 设置上游代理，并且只对目的地址为127.0.0.1:443的流量进行解密 mitmdump --mode upstream:http://127.0.0.1:1081 --allow-hosts 127.0.0.1:443","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/tool/linux-tool/linux-mitm-proxy.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"mitmproxy"}],["meta",{"property":"og:description","content":"mitmproxy 设置上游代理，并且只对目的地址为127.0.0.1:443的流量进行解密 mitmdump --mode upstream:http://127.0.0.1:1081 --allow-hosts 127.0.0.1:443"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-12T02:38:44.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-12T02:38:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mitmproxy\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-12T02:38:44.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1723430324000,"updatedTime":1723430324000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.13,"words":39},"filePathRelative":"posts/tool/linux-tool/linux-mitm-proxy.md","localizedDate":"2024年8月12日","excerpt":"<h1> mitmproxy</h1>\\n<p>设置上游代理，并且只对目的地址为<code>127.0.0.1:443</code>的流量进行解密</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code>mitmdump <span class=\\"token parameter variable\\">--mode</span> upstream:http://127.0.0.1:1081 --allow-hosts <span class=\\"token number\\">127.0</span>.0.1:443\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};