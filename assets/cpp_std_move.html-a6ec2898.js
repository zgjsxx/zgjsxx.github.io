const n=JSON.parse('{"key":"v-ca742b06","path":"/posts/Program_language/cpp/cpp_std_move.html","title":"std::move","lang":"zh-CN","frontmatter":{"category":["C++"],"description":"std::move std::move返回局部变量 #include &lt;memory&gt; #include &lt;iostream&gt; class A { public: A(){ std::cout &lt;&lt; \\"A()\\" &lt;&lt; std::endl; } ~A(){ std::cout &lt;&lt; \\"~A()\\" &lt;&lt; std::endl; } A(const A&amp; other){ std::cout &lt;&lt;\\"A(const A&amp; other)\\"&lt;&lt; std::endl; } A&amp; operator=(const A&amp; other){ std::cout &lt;&lt;\\"const A&amp; other\\"&lt;&lt; std::endl; } A(A&amp;&amp; other){ std::cout &lt;&lt;\\"A&amp;&amp; other\\"&lt;&lt; std::endl; } A&amp; operator=(A&amp;&amp; other){ std::cout &lt;&lt;\\"A&amp; operator=(A&amp;&amp; other)\\"&lt;&lt; std::endl; } }; A GetA_1(){ A a; return a; } A GetA_2(){ A a; return std::move(a); } A GetA_3(A&amp; other){ return other; } A GetA_4(A&amp;&amp; other){ return std::move(other); } int main() { A a1 = GetA_1(); std::cout &lt;&lt; \\"===\\" &lt;&lt; std::endl; A a2 = GetA_2(); std::cout &lt;&lt; \\"===\\" &lt;&lt; std::endl; A a3; A a4 = GetA_3(a3); std::cout &lt;&lt; \\"===\\" &lt;&lt; std::endl; A a5; A a6 = GetA_4(std::move(a5)); std::cout &lt;&lt; \\"===\\" &lt;&lt; std::endl; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_std_move.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"std::move"}],["meta",{"property":"og:description","content":"std::move std::move返回局部变量 #include &lt;memory&gt; #include &lt;iostream&gt; class A { public: A(){ std::cout &lt;&lt; \\"A()\\" &lt;&lt; std::endl; } ~A(){ std::cout &lt;&lt; \\"~A()\\" &lt;&lt; std::endl; } A(const A&amp; other){ std::cout &lt;&lt;\\"A(const A&amp; other)\\"&lt;&lt; std::endl; } A&amp; operator=(const A&amp; other){ std::cout &lt;&lt;\\"const A&amp; other\\"&lt;&lt; std::endl; } A(A&amp;&amp; other){ std::cout &lt;&lt;\\"A&amp;&amp; other\\"&lt;&lt; std::endl; } A&amp; operator=(A&amp;&amp; other){ std::cout &lt;&lt;\\"A&amp; operator=(A&amp;&amp; other)\\"&lt;&lt; std::endl; } }; A GetA_1(){ A a; return a; } A GetA_2(){ A a; return std::move(a); } A GetA_3(A&amp; other){ return other; } A GetA_4(A&amp;&amp; other){ return std::move(other); } int main() { A a1 = GetA_1(); std::cout &lt;&lt; \\"===\\" &lt;&lt; std::endl; A a2 = GetA_2(); std::cout &lt;&lt; \\"===\\" &lt;&lt; std::endl; A a3; A a4 = GetA_3(a3); std::cout &lt;&lt; \\"===\\" &lt;&lt; std::endl; A a5; A a6 = GetA_4(std::move(a5)); std::cout &lt;&lt; \\"===\\" &lt;&lt; std::endl; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-10T02:38:47.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-10T02:38:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"std::move\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-10T02:38:47.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"std::move返回局部变量","slug":"std-move返回局部变量","link":"#std-move返回局部变量","children":[]}],"git":{"createdTime":1694313527000,"updatedTime":1694313527000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.48,"words":143},"filePathRelative":"posts/Program_language/cpp/cpp_std_move.md","localizedDate":"2023年9月10日","excerpt":"<h1> std::move</h1>\\n<h2> std::move返回局部变量</h2>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;memory&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">A</span>\\n<span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token function\\">A</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"A()\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token operator\\">~</span><span class=\\"token function\\">A</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"~A()\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token function\\">A</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> A<span class=\\"token operator\\">&amp;</span> other<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span><span class=\\"token string\\">\\"A(const A&amp; other)\\"</span><span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    A<span class=\\"token operator\\">&amp;</span> <span class=\\"token keyword\\">operator</span><span class=\\"token operator\\">=</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> A<span class=\\"token operator\\">&amp;</span> other<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span><span class=\\"token string\\">\\"const A&amp; other\\"</span><span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>        \\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token function\\">A</span><span class=\\"token punctuation\\">(</span>A<span class=\\"token operator\\">&amp;&amp;</span> other<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span><span class=\\"token string\\">\\"A&amp;&amp; other\\"</span><span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span> \\n    <span class=\\"token punctuation\\">}</span>\\n    A<span class=\\"token operator\\">&amp;</span> <span class=\\"token keyword\\">operator</span><span class=\\"token operator\\">=</span><span class=\\"token punctuation\\">(</span>A<span class=\\"token operator\\">&amp;&amp;</span> other<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span><span class=\\"token string\\">\\"A&amp; operator=(A&amp;&amp; other)\\"</span><span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>        \\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\nA <span class=\\"token function\\">GetA_1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    A a<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> a<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\nA <span class=\\"token function\\">GetA_2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    A a<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">move</span><span class=\\"token punctuation\\">(</span>a<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\nA <span class=\\"token function\\">GetA_3</span><span class=\\"token punctuation\\">(</span>A<span class=\\"token operator\\">&amp;</span> other<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> other<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\nA <span class=\\"token function\\">GetA_4</span><span class=\\"token punctuation\\">(</span>A<span class=\\"token operator\\">&amp;&amp;</span> other<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">move</span><span class=\\"token punctuation\\">(</span>other<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    A a1 <span class=\\"token operator\\">=</span> <span class=\\"token function\\">GetA_1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"===\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    A a2 <span class=\\"token operator\\">=</span> <span class=\\"token function\\">GetA_2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"===\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span> \\n    A a3<span class=\\"token punctuation\\">;</span>\\n    A a4 <span class=\\"token operator\\">=</span> <span class=\\"token function\\">GetA_3</span><span class=\\"token punctuation\\">(</span>a3<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"===\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span> \\n    A a5<span class=\\"token punctuation\\">;</span>\\n    A a6 <span class=\\"token operator\\">=</span> <span class=\\"token function\\">GetA_4</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">move</span><span class=\\"token punctuation\\">(</span>a5<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"===\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span> \\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};