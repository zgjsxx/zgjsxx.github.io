const n=JSON.parse('{"key":"v-2f79de8a","path":"/posts/datastructure_algorithm/merge-sort.html","title":"","lang":"zh-CN","frontmatter":{"category":["data structure"],"tag":["data structure"],"description":"归并排序分析 #include &lt;iostream&gt; #include &lt;vector&gt; using namespace std; // 合并两个有序子数组 void merge(vector&lt;int&gt;&amp; arr, int left, int mid, int right) { int n1 = mid - left + 1; // 左子数组的大小 int n2 = right - mid; // 右子数组的大小 // 创建临时数组 vector&lt;int&gt; leftArray(n1); vector&lt;int&gt; rightArray(n2); // 拷贝数据到临时数组 for (int i = 0; i &lt; n1; i++) leftArray[i] = arr[left + i]; for (int j = 0; j &lt; n2; j++) rightArray[j] = arr[mid + 1 + j]; // 合并临时数组 int i = 0; // 左子数组的起始索引 int j = 0; // 右子数组的起始索引 int k = left; // 合并后数组的起始索引 while (i &lt; n1 &amp;&amp; j &lt; n2) { if (leftArray[i] &lt;= rightArray[j]) { arr[k] = leftArray[i]; i++; } else { arr[k] = rightArray[j]; j++; } k++; } // 复制左子数组的剩余元素 while (i &lt; n1) { arr[k] = leftArray[i]; i++; k++; } // 复制右子数组的剩余元素 while (j &lt; n2) { arr[k] = rightArray[j]; j++; k++; } } // 递归归并排序函数 void mergeSort(vector&lt;int&gt;&amp; arr, int left, int right) { if (left &lt; right) { int mid = left + (right - left) / 2; // 计算中间点 // 递归排序左半部分 mergeSort(arr, left, mid); // 递归排序右半部分 mergeSort(arr, mid + 1, right); // 合并两个有序子数组 merge(arr, left, mid, right); } } // 主函数 int main() { vector&lt;int&gt; arr = {12, 11, 13, 5, 6, 7}; int n = arr.size(); cout &lt;&lt; \\"Original array: \\"; for (int num : arr) { cout &lt;&lt; num &lt;&lt; \\" \\"; } cout &lt;&lt; endl; mergeSort(arr, 0, n - 1); cout &lt;&lt; \\"Sorted array: \\"; for (int num : arr) { cout &lt;&lt; num &lt;&lt; \\" \\"; } cout &lt;&lt; endl; return 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/datastructure_algorithm/merge-sort.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:description","content":"归并排序分析 #include &lt;iostream&gt; #include &lt;vector&gt; using namespace std; // 合并两个有序子数组 void merge(vector&lt;int&gt;&amp; arr, int left, int mid, int right) { int n1 = mid - left + 1; // 左子数组的大小 int n2 = right - mid; // 右子数组的大小 // 创建临时数组 vector&lt;int&gt; leftArray(n1); vector&lt;int&gt; rightArray(n2); // 拷贝数据到临时数组 for (int i = 0; i &lt; n1; i++) leftArray[i] = arr[left + i]; for (int j = 0; j &lt; n2; j++) rightArray[j] = arr[mid + 1 + j]; // 合并临时数组 int i = 0; // 左子数组的起始索引 int j = 0; // 右子数组的起始索引 int k = left; // 合并后数组的起始索引 while (i &lt; n1 &amp;&amp; j &lt; n2) { if (leftArray[i] &lt;= rightArray[j]) { arr[k] = leftArray[i]; i++; } else { arr[k] = rightArray[j]; j++; } k++; } // 复制左子数组的剩余元素 while (i &lt; n1) { arr[k] = leftArray[i]; i++; k++; } // 复制右子数组的剩余元素 while (j &lt; n2) { arr[k] = rightArray[j]; j++; k++; } } // 递归归并排序函数 void mergeSort(vector&lt;int&gt;&amp; arr, int left, int right) { if (left &lt; right) { int mid = left + (right - left) / 2; // 计算中间点 // 递归排序左半部分 mergeSort(arr, left, mid); // 递归排序右半部分 mergeSort(arr, mid + 1, right); // 合并两个有序子数组 merge(arr, left, mid, right); } } // 主函数 int main() { vector&lt;int&gt; arr = {12, 11, 13, 5, 6, 7}; int n = arr.size(); cout &lt;&lt; \\"Original array: \\"; for (int num : arr) { cout &lt;&lt; num &lt;&lt; \\" \\"; } cout &lt;&lt; endl; mergeSort(arr, 0, n - 1); cout &lt;&lt; \\"Sorted array: \\"; for (int num : arr) { cout &lt;&lt; num &lt;&lt; \\" \\"; } cout &lt;&lt; endl; return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-05T14:47:24.000Z"}],["meta",{"property":"article:tag","content":"data structure"}],["meta",{"property":"article:modified_time","content":"2024-08-05T14:47:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-05T14:47:24.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"归并排序分析","slug":"归并排序分析","link":"#归并排序分析","children":[]}],"git":{"createdTime":1687746469000,"updatedTime":1722869244000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":1.11,"words":332},"filePathRelative":"posts/datastructure_algorithm/merge-sort.md","localizedDate":"2023年6月26日","excerpt":"<h2> 归并排序分析</h2>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;vector&gt;</span></span>\\n\\n<span class=\\"token keyword\\">using</span> <span class=\\"token keyword\\">namespace</span> std<span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">// 合并两个有序子数组</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">merge</span><span class=\\"token punctuation\\">(</span>vector<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span><span class=\\"token operator\\">&amp;</span> arr<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> left<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> mid<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> right<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">int</span> n1 <span class=\\"token operator\\">=</span> mid <span class=\\"token operator\\">-</span> left <span class=\\"token operator\\">+</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 左子数组的大小</span>\\n    <span class=\\"token keyword\\">int</span> n2 <span class=\\"token operator\\">=</span> right <span class=\\"token operator\\">-</span> mid<span class=\\"token punctuation\\">;</span>    <span class=\\"token comment\\">// 右子数组的大小</span>\\n\\n    <span class=\\"token comment\\">// 创建临时数组</span>\\n    vector<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token function\\">leftArray</span><span class=\\"token punctuation\\">(</span>n1<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    vector<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token function\\">rightArray</span><span class=\\"token punctuation\\">(</span>n2<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 拷贝数据到临时数组</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> n1<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span>\\n        leftArray<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> arr<span class=\\"token punctuation\\">[</span>left <span class=\\"token operator\\">+</span> i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> j <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> j <span class=\\"token operator\\">&lt;</span> n2<span class=\\"token punctuation\\">;</span> j<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span>\\n        rightArray<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> arr<span class=\\"token punctuation\\">[</span>mid <span class=\\"token operator\\">+</span> <span class=\\"token number\\">1</span> <span class=\\"token operator\\">+</span> j<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 合并临时数组</span>\\n    <span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 左子数组的起始索引</span>\\n    <span class=\\"token keyword\\">int</span> j <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 右子数组的起始索引</span>\\n    <span class=\\"token keyword\\">int</span> k <span class=\\"token operator\\">=</span> left<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 合并后数组的起始索引</span>\\n\\n    <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">&lt;</span> n1 <span class=\\"token operator\\">&amp;&amp;</span> j <span class=\\"token operator\\">&lt;</span> n2<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>leftArray<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">&lt;=</span> rightArray<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            arr<span class=\\"token punctuation\\">[</span>k<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> leftArray<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n            i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n            arr<span class=\\"token punctuation\\">[</span>k<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> rightArray<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n            j<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n        k<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// 复制左子数组的剩余元素</span>\\n    <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">&lt;</span> n1<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        arr<span class=\\"token punctuation\\">[</span>k<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> leftArray<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n        i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n        k<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token comment\\">// 复制右子数组的剩余元素</span>\\n    <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>j <span class=\\"token operator\\">&lt;</span> n2<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        arr<span class=\\"token punctuation\\">[</span>k<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> rightArray<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n        j<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n        k<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\">// 递归归并排序函数</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">mergeSort</span><span class=\\"token punctuation\\">(</span>vector<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span><span class=\\"token operator\\">&amp;</span> arr<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> left<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> right<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>left <span class=\\"token operator\\">&lt;</span> right<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">int</span> mid <span class=\\"token operator\\">=</span> left <span class=\\"token operator\\">+</span> <span class=\\"token punctuation\\">(</span>right <span class=\\"token operator\\">-</span> left<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">/</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 计算中间点</span>\\n\\n        <span class=\\"token comment\\">// 递归排序左半部分</span>\\n        <span class=\\"token function\\">mergeSort</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">,</span> left<span class=\\"token punctuation\\">,</span> mid<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token comment\\">// 递归排序右半部分</span>\\n        <span class=\\"token function\\">mergeSort</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">,</span> mid <span class=\\"token operator\\">+</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> right<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token comment\\">// 合并两个有序子数组</span>\\n        <span class=\\"token function\\">merge</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">,</span> left<span class=\\"token punctuation\\">,</span> mid<span class=\\"token punctuation\\">,</span> right<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\">// 主函数</span>\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    vector<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span> arr <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token number\\">12</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">11</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">13</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">6</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">7</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> n <span class=\\"token operator\\">=</span> arr<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">size</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"Original array: \\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> num <span class=\\"token operator\\">:</span> arr<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        cout <span class=\\"token operator\\">&lt;&lt;</span> num <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\" \\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    cout <span class=\\"token operator\\">&lt;&lt;</span> endl<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token function\\">mergeSort</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> n <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"Sorted array: \\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> num <span class=\\"token operator\\">:</span> arr<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        cout <span class=\\"token operator\\">&lt;&lt;</span> num <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\" \\"</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    cout <span class=\\"token operator\\">&lt;&lt;</span> endl<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
