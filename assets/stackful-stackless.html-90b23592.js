const t=JSON.parse('{"key":"v-60f2aa2e","path":"/posts/Linux/coroutine/stackful-stackless.html","title":"无栈协程和有栈协程的对比","lang":"zh-CN","frontmatter":{"description":"category: Linux tag: 协程 无栈协程和有栈协程的对比 有栈协程 无栈协程 无栈协程兼容同步代码会导致async/await关键字的传染 下面的例子是python的一个例子，由于sleep函数是一个异步函数，而sum函数调用了它，则sum函数需要添加async/await。而sum_wrapper1调用了sum函数，因此 sum_wrapper1也需要添加async/await。sum_wrapper2和sum_wrapper_final也是相同的原因，都添加上了async/await。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/coroutine/stackful-stackless.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"无栈协程和有栈协程的对比"}],["meta",{"property":"og:description","content":"category: Linux tag: 协程 无栈协程和有栈协程的对比 有栈协程 无栈协程 无栈协程兼容同步代码会导致async/await关键字的传染 下面的例子是python的一个例子，由于sleep函数是一个异步函数，而sum函数调用了它，则sum函数需要添加async/await。而sum_wrapper1调用了sum函数，因此 sum_wrapper1也需要添加async/await。sum_wrapper2和sum_wrapper_final也是相同的原因，都添加上了async/await。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-08T02:19:36.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-08T02:19:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"无栈协程和有栈协程的对比\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-08T02:19:36.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"有栈协程","slug":"有栈协程","link":"#有栈协程","children":[]},{"level":2,"title":"无栈协程","slug":"无栈协程","link":"#无栈协程","children":[{"level":3,"title":"无栈协程兼容同步代码会导致async/await关键字的传染","slug":"无栈协程兼容同步代码会导致async-await关键字的传染","link":"#无栈协程兼容同步代码会导致async-await关键字的传染","children":[]}]}],"git":{"createdTime":1686190776000,"updatedTime":1686190776000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.76,"words":229},"filePathRelative":"posts/Linux/coroutine/stackful-stackless.md","localizedDate":"2023年6月8日","excerpt":"<hr>\\n<p>category:</p>\\n<ul>\\n<li>Linux\\ntag:</li>\\n<li>协程</li>\\n</ul>\\n<hr>\\n<h1> 无栈协程和有栈协程的对比</h1>\\n<h2> 有栈协程</h2>\\n<h2> 无栈协程</h2>\\n<h3> 无栈协程兼容同步代码会导致async/await关键字的传染</h3>\\n<p>下面的例子是python的一个例子，由于sleep函数是一个异步函数，而sum函数调用了它，则sum函数需要添加async/await。而sum_wrapper1调用了sum函数，因此\\nsum_wrapper1也需要添加async/await。sum_wrapper2和sum_wrapper_final也是相同的原因，都添加上了async/await。</p>","autoDesc":true}');export{t as data};