const t=JSON.parse('{"key":"v-7a20e35f","path":"/posts/datastructure_algorithm/monotonic-stack.html","title":"单调栈","lang":"zh-CN","frontmatter":{"category":["data structure"],"tag":["data structure"],"description":"单调栈 单调栈是一种栈的特殊应用，用于解决一类需要在数据序列中找到特定元素的“最近较大/较小值”的问题。它的核心思想是通过保持栈内元素的单调性（即元素从栈底到栈顶按某种顺序排列），来简化和优化这些问题的解决。 单调栈的种类 单调递增栈：栈内元素从栈底到栈顶严格递增。也就是说，新加入栈的元素一定比栈顶元素大。用于查找每个元素左侧或者右侧第一个小于它的元素。 单调递减栈：栈内元素从栈底到栈顶严格递减。也就是说，新加入栈的元素一定比栈顶元素小。用于查找每个元素左侧或者右侧第一个大于它的元素。 单调栈的基本操作 在遍历元素序列时，对于每个元素 xi​","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/datastructure_algorithm/monotonic-stack.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"单调栈"}],["meta",{"property":"og:description","content":"单调栈 单调栈是一种栈的特殊应用，用于解决一类需要在数据序列中找到特定元素的“最近较大/较小值”的问题。它的核心思想是通过保持栈内元素的单调性（即元素从栈底到栈顶按某种顺序排列），来简化和优化这些问题的解决。 单调栈的种类 单调递增栈：栈内元素从栈底到栈顶严格递增。也就是说，新加入栈的元素一定比栈顶元素大。用于查找每个元素左侧或者右侧第一个小于它的元素。 单调递减栈：栈内元素从栈底到栈顶严格递减。也就是说，新加入栈的元素一定比栈顶元素小。用于查找每个元素左侧或者右侧第一个大于它的元素。 单调栈的基本操作 在遍历元素序列时，对于每个元素 xi​"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-12T02:36:48.000Z"}],["meta",{"property":"article:tag","content":"data structure"}],["meta",{"property":"article:modified_time","content":"2024-08-12T02:36:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"单调栈\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-12T02:36:48.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1723306518000,"updatedTime":1723430208000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1},{"name":"zgjsxx","email":"119160625@qq.com","commits":1}]},"readingTime":{"minutes":2.76,"words":827},"filePathRelative":"posts/datastructure_algorithm/monotonic-stack.md","localizedDate":"2024年8月10日","excerpt":"<h1> 单调栈</h1>\\n<p>单调栈是一种栈的特殊应用，用于解决一类需要在数据序列中找到特定元素的“最近较大/较小值”的问题。它的核心思想是通过保持栈内元素的单调性（即元素从栈底到栈顶按某种顺序排列），来简化和优化这些问题的解决。</p>\\n<p>单调栈的种类</p>\\n<ul>\\n<li>单调递增栈：栈内元素从栈底到栈顶严格递增。也就是说，新加入栈的元素一定比栈顶元素大。用于查找每个元素左侧或者右侧第一个小于它的元素。</li>\\n<li>单调递减栈：栈内元素从栈底到栈顶严格递减。也就是说，新加入栈的元素一定比栈顶元素小。用于查找每个元素左侧或者右侧第一个大于它的元素。</li>\\n</ul>\\n<p>单调栈的基本操作\\n在遍历元素序列时，对于每个元素 <span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.5806em;vertical-align:-0.15em;\\"></span><span class=\\"mord\\"><span class=\\"mord\\"><span class=\\"mord mathnormal\\">x</span></span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.3117em;\\"><span style=\\"top:-2.55em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mathnormal mtight\\">i</span></span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span></span></span></span></p>","autoDesc":true}');export{t as data};