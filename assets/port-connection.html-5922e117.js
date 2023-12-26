const n=JSON.parse(`{"key":"v-6ae99d32","path":"/posts/Program_language/verilog/port-connection.html","title":"四选一多路选择器","lang":"zh-CN","frontmatter":{"category":["Verilog"],"description":"四选一多路选择器 1.使用assign 语句实现 \`timescale 1ns/1ns module mux4_1( input [1:0]d1,d2,d3,d0, input [1:0]sel, output[1:0]mux_out ); assign mux_out = (sel == 'b00) ? d3: (sel == 'b01) ? d2: (sel == 'b10) ? d1: d0; endmodule","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/verilog/port-connection.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"四选一多路选择器"}],["meta",{"property":"og:description","content":"四选一多路选择器 1.使用assign 语句实现 \`timescale 1ns/1ns module mux4_1( input [1:0]d1,d2,d3,d0, input [1:0]sel, output[1:0]mux_out ); assign mux_out = (sel == 'b00) ? d3: (sel == 'b01) ? d2: (sel == 'b10) ? d1: d0; endmodule"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-26T09:54:34.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-26T09:54:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"四选一多路选择器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-12-26T09:54:34.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1703584474000,"updatedTime":1703584474000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.47,"words":142},"filePathRelative":"posts/Program_language/verilog/port-connection.md","localizedDate":"2023年12月26日","excerpt":"<h1> 四选一多路选择器</h1>\\n<p>1.使用assign 语句实现</p>\\n<div class=\\"language-verilog line-numbers-mode\\" data-ext=\\"verilog\\"><pre class=\\"language-verilog\\"><code><span class=\\"token constant\\">\`timescale</span> <span class=\\"token number\\">1</span>ns<span class=\\"token operator\\">/</span><span class=\\"token number\\">1</span>ns\\n<span class=\\"token keyword\\">module</span> <span class=\\"token function\\">mux4_1</span><span class=\\"token punctuation\\">(</span>\\n<span class=\\"token keyword\\">input</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span>d1<span class=\\"token punctuation\\">,</span>d2<span class=\\"token punctuation\\">,</span>d3<span class=\\"token punctuation\\">,</span>d0<span class=\\"token punctuation\\">,</span>\\n<span class=\\"token keyword\\">input</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span>sel<span class=\\"token punctuation\\">,</span>\\n<span class=\\"token keyword\\">output</span><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span>mux_out\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">assign</span> mux_out <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>sel <span class=\\"token operator\\">==</span> <span class=\\"token number\\">'b00</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">?</span> d3<span class=\\"token punctuation\\">:</span>\\n                 <span class=\\"token punctuation\\">(</span>sel <span class=\\"token operator\\">==</span> <span class=\\"token number\\">'b01</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">?</span> d2<span class=\\"token punctuation\\">:</span>\\n                 <span class=\\"token punctuation\\">(</span>sel <span class=\\"token operator\\">==</span> <span class=\\"token number\\">'b10</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">?</span> d1<span class=\\"token punctuation\\">:</span>\\n                 d0<span class=\\"token punctuation\\">;</span>\\n                 \\n<span class=\\"token keyword\\">endmodule</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};
