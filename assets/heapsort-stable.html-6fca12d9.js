const t=JSON.parse('{"key":"v-6a1935c6","path":"/posts/datastructure_algorithm/heapsort-stable.html","title":"面试题：推排序是一种稳定排序吗？","lang":"zh-CN","frontmatter":{"category":["data structure"],"tag":["data structure"],"description":"面试题：推排序是一种稳定排序吗？ 在回答该问题前，首先需要了解什么是稳定排序。 稳定性就是指对于两个关键字相等的记录，它们在序列中的相对位置，在排序之前和排序之后没有发生改变。通俗地讲就是有两个关键字相等的数据A、B，排序前，A的位置是 i ，B的位置是 j，此时 i &lt; j，则如果在排序后A的位置还是在B之前，那么称它是稳定的。 那么堆排序是一个稳定排序吗？ 堆排序的稳定性分析 直接上答案堆排序并不是一个稳定排序。 堆排序的会将原始的数组转化成一个大顶堆或一个小顶堆，在输出堆顶后，此时需要维护堆，操作如下：","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/datastructure_algorithm/heapsort-stable.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"面试题：推排序是一种稳定排序吗？"}],["meta",{"property":"og:description","content":"面试题：推排序是一种稳定排序吗？ 在回答该问题前，首先需要了解什么是稳定排序。 稳定性就是指对于两个关键字相等的记录，它们在序列中的相对位置，在排序之前和排序之后没有发生改变。通俗地讲就是有两个关键字相等的数据A、B，排序前，A的位置是 i ，B的位置是 j，此时 i &lt; j，则如果在排序后A的位置还是在B之前，那么称它是稳定的。 那么堆排序是一个稳定排序吗？ 堆排序的稳定性分析 直接上答案堆排序并不是一个稳定排序。 堆排序的会将原始的数组转化成一个大顶堆或一个小顶堆，在输出堆顶后，此时需要维护堆，操作如下："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-18T12:24:59.000Z"}],["meta",{"property":"article:tag","content":"data structure"}],["meta",{"property":"article:modified_time","content":"2023-06-18T12:24:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"面试题：推排序是一种稳定排序吗？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-18T12:24:59.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"堆排序的稳定性分析","slug":"堆排序的稳定性分析","link":"#堆排序的稳定性分析","children":[]}],"git":{"createdTime":1687091099000,"updatedTime":1687091099000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":2.65,"words":795},"filePathRelative":"posts/datastructure_algorithm/heapsort-stable.md","localizedDate":"2023年6月18日","excerpt":"<h1> 面试题：推排序是一种稳定排序吗？</h1>\\n<p>在回答该问题前，首先需要了解什么是稳定排序。</p>\\n<p><strong>稳定性</strong>就是指对于两个关键字相等的记录，它们在序列中的相对位置，在排序之前和排序之后没有发生改变。通俗地讲就是有两个关键字相等的数据A、B，排序前，A的位置是 i ，B的位置是 j，此时 i &lt; j，则如果在排序后A的位置还是在B之前，那么称它是稳定的。</p>\\n<p>那么堆排序是一个稳定排序吗？</p>\\n<h2> 堆排序的稳定性分析</h2>\\n<p>直接上答案堆排序并不是一个稳定排序。</p>\\n<p>堆排序的会将原始的数组转化成一个大顶堆或一个小顶堆，在输出堆顶后，此时需要维护堆，操作如下：</p>","autoDesc":true}');export{t as data};
