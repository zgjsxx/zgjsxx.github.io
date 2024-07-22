const t=JSON.parse('{"key":"v-fbb8d2e4","path":"/posts/Interview/network.html","title":"Network","lang":"zh-CN","frontmatter":{"category":["面经"],"tag":["计算机网络面经"],"description":"Network TIME_WAIT的状态是在哪一端产生的？它的作用是什么？ TIME_WAIT状态在主动关闭端产生。主要作用如下： 可靠的关闭连接。保证最后一个确认消息能被对方收到。如果直接关闭连接，那么对方可能会因为没有收到确认消息而无法关闭连接。 避免旧连接的失效数据在新的连接中被错误接收。由于网络原因，有可能会有一些旧的数据在网络中滞留。如果没有TIME_WAIT，在连接关闭后如果直接开启新的连接，这些旧的数据可能会被新的连接误认为是当前连接的数据，造成问题。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Interview/network.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Network"}],["meta",{"property":"og:description","content":"Network TIME_WAIT的状态是在哪一端产生的？它的作用是什么？ TIME_WAIT状态在主动关闭端产生。主要作用如下： 可靠的关闭连接。保证最后一个确认消息能被对方收到。如果直接关闭连接，那么对方可能会因为没有收到确认消息而无法关闭连接。 避免旧连接的失效数据在新的连接中被错误接收。由于网络原因，有可能会有一些旧的数据在网络中滞留。如果没有TIME_WAIT，在连接关闭后如果直接开启新的连接，这些旧的数据可能会被新的连接误认为是当前连接的数据，造成问题。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T06:54:54.000Z"}],["meta",{"property":"article:tag","content":"计算机网络面经"}],["meta",{"property":"article:modified_time","content":"2024-07-22T06:54:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Network\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-22T06:54:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"TIME_WAIT的状态是在哪一端产生的？它的作用是什么？","slug":"time-wait的状态是在哪一端产生的-它的作用是什么","link":"#time-wait的状态是在哪一端产生的-它的作用是什么","children":[]}],"git":{"createdTime":1685071012000,"updatedTime":1721631294000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":0.66,"words":197},"filePathRelative":"posts/Interview/network.md","localizedDate":"2023年5月26日","excerpt":"<h1> Network</h1>\\n<h2> TIME_WAIT的状态是在哪一端产生的？它的作用是什么？</h2>\\n<p>TIME_WAIT状态在主动关闭端产生。主要作用如下：</p>\\n<ul>\\n<li>可靠的关闭连接。保证最后一个确认消息能被对方收到。如果直接关闭连接，那么对方可能会因为没有收到确认消息而无法关闭连接。</li>\\n<li>避免旧连接的失效数据在新的连接中被错误接收。由于网络原因，有可能会有一些旧的数据在网络中滞留。如果没有TIME_WAIT，在连接关闭后如果直接开启新的连接，这些旧的数据可能会被新的连接误认为是当前连接的数据，造成问题。</li>\\n</ul>\\n","autoDesc":true}');export{t as data};
