const t=JSON.parse('{"key":"v-3ccee91c","path":"/posts/Program_language/cpp/cpp_cpp20_jthread.html","title":"c++20 jthread","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++"],"description":"c++20 jthread jthread是c++20所支持的新的线程类型，jthread = joinable thread, 即可以自动join的线程。我们知道在c++11之后，c++标准库开始支持多线程编程，那么thread和jthread之间有何区别，本文将进行重点讲解。 c++11 thread c++11中thread对象如果在销毁之前处于可join的状态，却没有join的话，将会引发一个异常， 例如下面的例子： #include &lt;iostream&gt; #include &lt;thread&gt; int main(){ std::cout &lt;&lt; std::endl; std::cout &lt;&lt; std::boolalpha; std::thread thr{[]{ std::cout &lt;&lt; \\"Joinable std::thread\\" &lt;&lt; std::endl; }}; std::cout &lt;&lt; \\"thr.joinable(): \\" &lt;&lt; thr.joinable() &lt;&lt; std::endl; std::cout &lt;&lt; std::endl; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_cpp20_jthread.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++20 jthread"}],["meta",{"property":"og:description","content":"c++20 jthread jthread是c++20所支持的新的线程类型，jthread = joinable thread, 即可以自动join的线程。我们知道在c++11之后，c++标准库开始支持多线程编程，那么thread和jthread之间有何区别，本文将进行重点讲解。 c++11 thread c++11中thread对象如果在销毁之前处于可join的状态，却没有join的话，将会引发一个异常， 例如下面的例子： #include &lt;iostream&gt; #include &lt;thread&gt; int main(){ std::cout &lt;&lt; std::endl; std::cout &lt;&lt; std::boolalpha; std::thread thr{[]{ std::cout &lt;&lt; \\"Joinable std::thread\\" &lt;&lt; std::endl; }}; std::cout &lt;&lt; \\"thr.joinable(): \\" &lt;&lt; thr.joinable() &lt;&lt; std::endl; std::cout &lt;&lt; std::endl; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-06T14:06:09.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:modified_time","content":"2023-06-06T14:06:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++20 jthread\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-06T14:06:09.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"c++11 thread","slug":"c-11-thread","link":"#c-11-thread","children":[]},{"level":2,"title":"jthread","slug":"jthread","link":"#jthread","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1686045847000,"updatedTime":1686060369000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":4}]},"readingTime":{"minutes":4.52,"words":1356},"filePathRelative":"posts/Program_language/cpp/cpp_cpp20_jthread.md","localizedDate":"2023年6月6日","excerpt":"<h1> c++20 jthread</h1>\\n<p>jthread是c++20所支持的新的线程类型，jthread = joinable thread, 即可以自动join的线程。我们知道在c++11之后，c++标准库开始支持多线程编程，那么thread和jthread之间有何区别，本文将进行重点讲解。</p>\\n<h2> c++11 thread</h2>\\n<p>c++11中thread对象如果在销毁之前处于可join的状态，却没有join的话，将会引发一个异常， 例如下面的例子：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;thread&gt;</span></span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    \\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>boolalpha<span class=\\"token punctuation\\">;</span>\\n    \\n    std<span class=\\"token double-colon punctuation\\">::</span>thread thr<span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">{</span> std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"Joinable std::thread\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"thr.joinable(): \\"</span> <span class=\\"token operator\\">&lt;&lt;</span> thr<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">joinable</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n    \\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};
