const e=JSON.parse('{"key":"v-3096a586","path":"/posts/Linux/application-dev/Linux-glibc-sem.html","title":"深入了解posix的信号量","lang":"zh-CN","frontmatter":{"category":["Linux"],"description":"深入了解posix的信号量 信号量是一种用于不同进程间或者同一进程间同步手段的方式。 典型的信号量具有P/V两个操作。 P操作又称之为等待(wait)操作。Edsger Dijkstra 称它为 P 操作，代表荷兰语单词 Proberen（意思是尝试）。它将尝试将信号量进行减1的操作。 V操作又称之为挂出(post)操作。V代表荷兰语单词 Verhogen（意思是增加）。其将对信号量执行加1操作。 我们所熟知的互斥锁其实就是一种特别的信号量，它是一种二值信号量，只有0/1两个值，同一时刻只能有一个对象拿到互斥锁的拥有权。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/application-dev/Linux-glibc-sem.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"深入了解posix的信号量"}],["meta",{"property":"og:description","content":"深入了解posix的信号量 信号量是一种用于不同进程间或者同一进程间同步手段的方式。 典型的信号量具有P/V两个操作。 P操作又称之为等待(wait)操作。Edsger Dijkstra 称它为 P 操作，代表荷兰语单词 Proberen（意思是尝试）。它将尝试将信号量进行减1的操作。 V操作又称之为挂出(post)操作。V代表荷兰语单词 Verhogen（意思是增加）。其将对信号量执行加1操作。 我们所熟知的互斥锁其实就是一种特别的信号量，它是一种二值信号量，只有0/1两个值，同一时刻只能有一个对象拿到互斥锁的拥有权。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-10T10:18:37.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-10T10:18:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入了解posix的信号量\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-10T10:18:37.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"源码分析","slug":"源码分析","link":"#源码分析","children":[]}],"git":{"createdTime":1688623802000,"updatedTime":1688984317000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":1.99,"words":596},"filePathRelative":"posts/Linux/application-dev/Linux-glibc-sem.md","localizedDate":"2023年7月6日","excerpt":"<h1> 深入了解posix的信号量</h1>\\n<p>信号量是一种用于不同进程间或者同一进程间同步手段的方式。</p>\\n<p>典型的信号量具有P/V两个操作。</p>\\n<p>P操作又称之为等待(wait)操作。Edsger Dijkstra 称它为 P 操作，代表荷兰语单词 Proberen（意思是尝试）。它将尝试将信号量进行减1的操作。</p>\\n<p>V操作又称之为挂出(post)操作。V代表荷兰语单词 Verhogen（意思是增加）。其将对信号量执行加1操作。</p>\\n<p>我们所熟知的互斥锁其实就是一种特别的信号量，它是一种二值信号量，只有0/1两个值，同一时刻只能有一个对象拿到互斥锁的拥有权。</p>","autoDesc":true}');export{e as data};
