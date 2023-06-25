const n=JSON.parse('{"key":"v-62bb3f1c","path":"/posts/datastructure_algorithm/insert-sort.html","title":"","lang":"zh-CN","frontmatter":{"category":["data structure"],"tag":["data structure"],"description":"#include &lt;stdio.h&gt; void swap(int *xp, int *yp) { \\tint temp = *xp; \\t*xp = *yp; \\t*yp = temp; } /* 对顺序表L作直接插入排序 */ void InsertSort(int arr[],int size) { \\tint i,j; \\tfor(i=1;i &lt; size;i++) \\t{ \\t\\tif (arr[i] &lt; arr[i-1]) \\t\\t{ \\t\\t\\tint value = arr[i]; \\t\\t\\tfor(j = i-1;arr[j] &gt; value &amp;&amp; j &gt;= 0;j--) \\t\\t\\t\\tarr[j+1] = arr[j]; \\t\\t\\tarr[j+1] = value; \\t\\t} \\t} } /* Function to print an array */ void printArray(int arr[], int size) { \\tint i; \\tfor (i=0; i &lt; size; i++) \\t\\tprintf(\\"%d \\", arr[i]); \\tprintf(\\"\\\\n\\"); } // Driver program to test above functions int main() { \\tint arr[] = {1, 64, 25, 12, 22, 11}; \\tint n = sizeof(arr)/sizeof(arr[0]); printf(\\"size = %d\\\\n\\", n); \\tInsertSort(arr, n); printf(\\"size = %d\\\\n\\", n); \\tprintf(\\"Sorted array: \\\\n\\"); \\tprintArray(arr, n); \\treturn 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/datastructure_algorithm/insert-sort.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:description","content":"#include &lt;stdio.h&gt; void swap(int *xp, int *yp) { \\tint temp = *xp; \\t*xp = *yp; \\t*yp = temp; } /* 对顺序表L作直接插入排序 */ void InsertSort(int arr[],int size) { \\tint i,j; \\tfor(i=1;i &lt; size;i++) \\t{ \\t\\tif (arr[i] &lt; arr[i-1]) \\t\\t{ \\t\\t\\tint value = arr[i]; \\t\\t\\tfor(j = i-1;arr[j] &gt; value &amp;&amp; j &gt;= 0;j--) \\t\\t\\t\\tarr[j+1] = arr[j]; \\t\\t\\tarr[j+1] = value; \\t\\t} \\t} } /* Function to print an array */ void printArray(int arr[], int size) { \\tint i; \\tfor (i=0; i &lt; size; i++) \\t\\tprintf(\\"%d \\", arr[i]); \\tprintf(\\"\\\\n\\"); } // Driver program to test above functions int main() { \\tint arr[] = {1, 64, 25, 12, 22, 11}; \\tint n = sizeof(arr)/sizeof(arr[0]); printf(\\"size = %d\\\\n\\", n); \\tInsertSort(arr, n); printf(\\"size = %d\\\\n\\", n); \\tprintf(\\"Sorted array: \\\\n\\"); \\tprintArray(arr, n); \\treturn 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T14:42:35.000Z"}],["meta",{"property":"article:tag","content":"data structure"}],["meta",{"property":"article:modified_time","content":"2023-06-25T14:42:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T14:42:35.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1687704155000,"updatedTime":1687704155000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.5,"words":151},"filePathRelative":"posts/datastructure_algorithm/insert-sort.md","localizedDate":"2023年6月25日","excerpt":"<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;stdio.h&gt;</span> </span>\\n\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">swap</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> <span class=\\"token operator\\">*</span>xp<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> <span class=\\"token operator\\">*</span>yp<span class=\\"token punctuation\\">)</span> \\n<span class=\\"token punctuation\\">{</span> \\n\\t<span class=\\"token keyword\\">int</span> temp <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">*</span>xp<span class=\\"token punctuation\\">;</span> \\n\\t<span class=\\"token operator\\">*</span>xp <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">*</span>yp<span class=\\"token punctuation\\">;</span> \\n\\t<span class=\\"token operator\\">*</span>yp <span class=\\"token operator\\">=</span> temp<span class=\\"token punctuation\\">;</span> \\n<span class=\\"token punctuation\\">}</span> \\n<span class=\\"token comment\\">/* 对顺序表L作直接插入排序 */</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">InsertSort</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> arr<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span><span class=\\"token keyword\\">int</span> size<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span> \\n\\t<span class=\\"token keyword\\">int</span> i<span class=\\"token punctuation\\">,</span>j<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token keyword\\">for</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token operator\\">=</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>i <span class=\\"token operator\\">&lt;</span> size<span class=\\"token punctuation\\">;</span>i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span>\\n\\t<span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">&lt;</span> arr<span class=\\"token punctuation\\">[</span>i<span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> \\n\\t\\t<span class=\\"token punctuation\\">{</span>\\n\\t\\t\\t<span class=\\"token keyword\\">int</span> value <span class=\\"token operator\\">=</span> arr<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span> \\n\\t\\t\\t<span class=\\"token keyword\\">for</span><span class=\\"token punctuation\\">(</span>j <span class=\\"token operator\\">=</span> i<span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>arr<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">&gt;</span> value <span class=\\"token operator\\">&amp;&amp;</span> j <span class=\\"token operator\\">&gt;=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>j<span class=\\"token operator\\">--</span><span class=\\"token punctuation\\">)</span>\\n\\t\\t\\t\\tarr<span class=\\"token punctuation\\">[</span>j<span class=\\"token operator\\">+</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> arr<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span> \\n\\t\\t\\tarr<span class=\\"token punctuation\\">[</span>j<span class=\\"token operator\\">+</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> value<span class=\\"token punctuation\\">;</span> \\n\\t\\t<span class=\\"token punctuation\\">}</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token comment\\">/* Function to print an array */</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">printArray</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> arr<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> size<span class=\\"token punctuation\\">)</span> \\n<span class=\\"token punctuation\\">{</span>     \\n\\t<span class=\\"token keyword\\">int</span> i<span class=\\"token punctuation\\">;</span> \\n\\t<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>i<span class=\\"token operator\\">=</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> size<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> \\n\\t\\t<span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"%d \\"</span><span class=\\"token punctuation\\">,</span> arr<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> \\n\\t<span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"\\\\n\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> \\n<span class=\\"token punctuation\\">}</span> \\n\\n<span class=\\"token comment\\">// Driver program to test above functions </span>\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> \\n<span class=\\"token punctuation\\">{</span> \\n\\t<span class=\\"token keyword\\">int</span> arr<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">64</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">25</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">12</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">22</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">11</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span> \\n\\t<span class=\\"token keyword\\">int</span> n <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">sizeof</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">/</span><span class=\\"token keyword\\">sizeof</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> \\n    <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"size = %d\\\\n\\"</span><span class=\\"token punctuation\\">,</span> n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">InsertSort</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">,</span> n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> \\n        <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"size = %d\\\\n\\"</span><span class=\\"token punctuation\\">,</span> n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Sorted array: \\\\n\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> \\n\\t<span class=\\"token function\\">printArray</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">,</span> n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> \\n\\t<span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> \\n<span class=\\"token punctuation\\">}</span> \\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
