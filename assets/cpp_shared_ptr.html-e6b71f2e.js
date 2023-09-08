const n=JSON.parse('{"key":"v-98d0ba14","path":"/posts/Program_language/cpp/cpp_shared_ptr.html","title":"c++智能指针之shared_ptr","lang":"zh-CN","frontmatter":{"category":["C++"],"description":"c++智能指针之shared_ptr std::shared_ptr简介 shared_ptr自定义删除器 函数指针 #include &lt;iostream&gt; #include &lt;memory&gt; void deleter(int* pNum) { std::cout &lt;&lt; \\"function pointor deleter\\" &lt;&lt; std::endl; delete pNum; } int main(int argc, const char* argv[]) { std::shared_ptr&lt;int&gt; spNum1; { std::shared_ptr&lt;int&gt; spNum2(new int, deleter); spNum1 = spNum2; } std::cout &lt;&lt; sizeof(spNum1) &lt;&lt; std::endl; return 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_shared_ptr.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++智能指针之shared_ptr"}],["meta",{"property":"og:description","content":"c++智能指针之shared_ptr std::shared_ptr简介 shared_ptr自定义删除器 函数指针 #include &lt;iostream&gt; #include &lt;memory&gt; void deleter(int* pNum) { std::cout &lt;&lt; \\"function pointor deleter\\" &lt;&lt; std::endl; delete pNum; } int main(int argc, const char* argv[]) { std::shared_ptr&lt;int&gt; spNum1; { std::shared_ptr&lt;int&gt; spNum2(new int, deleter); spNum1 = spNum2; } std::cout &lt;&lt; sizeof(spNum1) &lt;&lt; std::endl; return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-08T03:27:37.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-08T03:27:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++智能指针之shared_ptr\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-08T03:27:37.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"std::shared_ptr简介","slug":"std-shared-ptr简介","link":"#std-shared-ptr简介","children":[]},{"level":2,"title":"shared_ptr自定义删除器","slug":"shared-ptr自定义删除器","link":"#shared-ptr自定义删除器","children":[{"level":3,"title":"函数指针","slug":"函数指针","link":"#函数指针","children":[]},{"level":3,"title":"lambda函数","slug":"lambda函数","link":"#lambda函数","children":[]},{"level":3,"title":"仿函数","slug":"仿函数","link":"#仿函数","children":[]}]},{"level":2,"title":"shared_from_this","slug":"shared-from-this","link":"#shared-from-this","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1694143657000,"updatedTime":1694143657000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":2.03,"words":609},"filePathRelative":"posts/Program_language/cpp/cpp_shared_ptr.md","localizedDate":"2023年9月8日","excerpt":"<h1> c++智能指针之shared_ptr</h1>\\n<h2> std::shared_ptr简介</h2>\\n<h2> shared_ptr自定义删除器</h2>\\n<h3> 函数指针</h3>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;memory&gt;</span></span>\\n\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">deleter</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">*</span> pNum<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"function pointor deleter\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">delete</span> pNum<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> argc<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">const</span> <span class=\\"token keyword\\">char</span><span class=\\"token operator\\">*</span> argv<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>shared_ptr<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span> spNum1<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>shared_ptr<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token function\\">spNum2</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">,</span>  deleter<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        spNum1 <span class=\\"token operator\\">=</span> spNum2<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token keyword\\">sizeof</span><span class=\\"token punctuation\\">(</span>spNum1<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
