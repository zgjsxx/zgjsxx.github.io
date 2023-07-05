const t=JSON.parse('{"key":"v-6a1935c6","path":"/posts/datastructure_algorithm/heapsort-stable.html","title":"堆排序算法及其稳定性分析","lang":"zh-CN","frontmatter":{"category":["data structure"],"tag":["data structure"],"description":"堆排序算法及其稳定性分析 什么是堆排序？ 堆排序是利用数据结构堆而设计的一种排序算法。 堆分为两种，大顶堆和小顶堆。 所谓大顶堆就是每个节点的值都大于或者等于其左右孩子节点的值。 小顶堆则是相反的，每个节点的值都小于或者等于其左右孩子节点的值。 下面是一个大顶堆的示例，其拥有下面的性质: arr[i] &gt;= arr[2i+1] &amp;&amp; arr[i] &gt;= arr[2i+2]","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/datastructure_algorithm/heapsort-stable.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"堆排序算法及其稳定性分析"}],["meta",{"property":"og:description","content":"堆排序算法及其稳定性分析 什么是堆排序？ 堆排序是利用数据结构堆而设计的一种排序算法。 堆分为两种，大顶堆和小顶堆。 所谓大顶堆就是每个节点的值都大于或者等于其左右孩子节点的值。 小顶堆则是相反的，每个节点的值都小于或者等于其左右孩子节点的值。 下面是一个大顶堆的示例，其拥有下面的性质: arr[i] &gt;= arr[2i+1] &amp;&amp; arr[i] &gt;= arr[2i+2]"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-05T05:03:25.000Z"}],["meta",{"property":"article:tag","content":"data structure"}],["meta",{"property":"article:modified_time","content":"2023-07-05T05:03:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"堆排序算法及其稳定性分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-05T05:03:25.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是堆排序？","slug":"什么是堆排序","link":"#什么是堆排序","children":[]},{"level":2,"title":"堆排序的代码实现","slug":"堆排序的代码实现","link":"#堆排序的代码实现","children":[]},{"level":2,"title":"稳定性分析","slug":"稳定性分析","link":"#稳定性分析","children":[{"level":3,"title":"堆排序的稳定性分析","slug":"堆排序的稳定性分析","link":"#堆排序的稳定性分析","children":[]}]}],"git":{"createdTime":1687091099000,"updatedTime":1688533405000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":4}]},"readingTime":{"minutes":6.27,"words":1882},"filePathRelative":"posts/datastructure_algorithm/heapsort-stable.md","localizedDate":"2023年6月18日","excerpt":"<h1> 堆排序算法及其稳定性分析</h1>\\n<h2> 什么是堆排序？</h2>\\n<p>堆排序是利用数据结构堆而设计的一种排序算法。</p>\\n<p>堆分为两种，<strong>大顶堆</strong>和<strong>小顶堆</strong>。</p>\\n<p>所谓大顶堆就是每个节点的值都大于或者等于其左右孩子节点的值。</p>\\n<p>小顶堆则是相反的，每个节点的值都小于或者等于其左右孩子节点的值。</p>\\n<p>下面是一个大顶堆的示例，其拥有下面的性质:</p>\\n<p><code>arr[i] &gt;= arr[2i+1] &amp;&amp; arr[i] &gt;= arr[2i+2]</code></p>","autoDesc":true}');export{t as data};
