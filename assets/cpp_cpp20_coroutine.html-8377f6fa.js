const n=JSON.parse('{"key":"v-13eb1ece","path":"/posts/Program_language/cpp/cpp_cpp20_coroutine.html","title":"c++20 coroutine","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++"],"description":"c++20 coroutine 在c++20中，千呼万唤的协程终于来了，本文将对c++20的协程进行讲解，了解其使用方法。 简介 c++20的协程是无栈协程，通俗讲其是一种可以支持暂停和恢复运行的函数。 为此c++20新引入了3个关键字， co_await，co_yield和co_return，定义包含了上述三个关键字之一的函数是协程。 co_await 表达式——用于暂停执行，直到恢复： task&lt;&gt; tcp_echo_server() { char data[1024]; while (true) { std::size_t n = co_await socket.async_read_some(buffer(data)); co_await async_write(socket, buffer(data, n)); } }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_cpp20_coroutine.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++20 coroutine"}],["meta",{"property":"og:description","content":"c++20 coroutine 在c++20中，千呼万唤的协程终于来了，本文将对c++20的协程进行讲解，了解其使用方法。 简介 c++20的协程是无栈协程，通俗讲其是一种可以支持暂停和恢复运行的函数。 为此c++20新引入了3个关键字， co_await，co_yield和co_return，定义包含了上述三个关键字之一的函数是协程。 co_await 表达式——用于暂停执行，直到恢复： task&lt;&gt; tcp_echo_server() { char data[1024]; while (true) { std::size_t n = co_await socket.async_read_some(buffer(data)); co_await async_write(socket, buffer(data, n)); } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-12T05:58:00.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:modified_time","content":"2023-06-12T05:58:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++20 coroutine\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-12T05:58:00.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"c++20 coroutine编程范式","slug":"c-20-coroutine编程范式","link":"#c-20-coroutine编程范式","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1686120665000,"updatedTime":1686549480000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":7}]},"readingTime":{"minutes":7.47,"words":2241},"filePathRelative":"posts/Program_language/cpp/cpp_cpp20_coroutine.md","localizedDate":"2023年6月7日","excerpt":"<h1> c++20 coroutine</h1>\\n<p>在c++20中，千呼万唤的协程终于来了，本文将对c++20的协程进行讲解，了解其使用方法。</p>\\n<h2> 简介</h2>\\n<p>c++20的协程是<strong>无栈协程</strong>，通俗讲其是一种可以支持暂停和恢复运行的函数。</p>\\n<p>为此c++20新引入了3个关键字， co_await，co_yield和co_return，定义包含了上述三个关键字之一的函数是协程。</p>\\n<p><strong>co_await</strong> 表达式——用于暂停执行，直到恢复：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code>task<span class=\\"token operator\\">&lt;</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token function\\">tcp_echo_server</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">char</span> data<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        std<span class=\\"token double-colon punctuation\\">::</span>size_t n <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">co_await</span> socket<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">async_read_some</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">buffer</span><span class=\\"token punctuation\\">(</span>data<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">co_await</span> <span class=\\"token function\\">async_write</span><span class=\\"token punctuation\\">(</span>socket<span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">buffer</span><span class=\\"token punctuation\\">(</span>data<span class=\\"token punctuation\\">,</span> n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
