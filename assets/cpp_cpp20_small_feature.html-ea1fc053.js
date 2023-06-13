const t=JSON.parse('{"key":"v-28b49328","path":"/posts/Program_language/cpp/cpp_cpp20_small_feature.html","title":"c++20的新增的小的特性","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++"],"description":"c++20的新增的小的特性 c++20新增的特性非常多，其中concept，coroutine，module和range为四大特性，在之前的章节中已有涉及，本文则对其他的一些小改动进行讲解。 c++20的新增的小的特性 std::format Calendar timezone std::source_location std::span 航天飞机运算符 &lt;=&gt; std::endian判断大小端 std::remove_cvref bind_front std::atomic_ref std::map&lt;Key,T,Compare,Allocator&gt;::contains std::barrier std::latch锁存器 std::counting_semaphore string::starts_with / ends_with std::size std::is_bounded_array_v和std::is_unbounded_array std::erase_if Mathematical constants std::midpoint std::lerp","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_cpp20_small_feature.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++20的新增的小的特性"}],["meta",{"property":"og:description","content":"c++20的新增的小的特性 c++20新增的特性非常多，其中concept，coroutine，module和range为四大特性，在之前的章节中已有涉及，本文则对其他的一些小改动进行讲解。 c++20的新增的小的特性 std::format Calendar timezone std::source_location std::span 航天飞机运算符 &lt;=&gt; std::endian判断大小端 std::remove_cvref bind_front std::atomic_ref std::map&lt;Key,T,Compare,Allocator&gt;::contains std::barrier std::latch锁存器 std::counting_semaphore string::starts_with / ends_with std::size std::is_bounded_array_v和std::is_unbounded_array std::erase_if Mathematical constants std::midpoint std::lerp"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-13T02:57:20.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:modified_time","content":"2023-06-13T02:57:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++20的新增的小的特性\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-13T02:57:20.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"std::format","slug":"std-format","link":"#std-format","children":[]},{"level":2,"title":"Calendar","slug":"calendar","link":"#calendar","children":[]},{"level":2,"title":"timezone","slug":"timezone","link":"#timezone","children":[]},{"level":2,"title":"std::source_location","slug":"std-source-location","link":"#std-source-location","children":[]},{"level":2,"title":"std::span","slug":"std-span","link":"#std-span","children":[]},{"level":2,"title":"航天飞机运算符 <=>","slug":"航天飞机运算符","link":"#航天飞机运算符","children":[]},{"level":2,"title":"std::endian判断大小端","slug":"std-endian判断大小端","link":"#std-endian判断大小端","children":[]},{"level":2,"title":"std::remove_cvref","slug":"std-remove-cvref","link":"#std-remove-cvref","children":[]},{"level":2,"title":"bind_front","slug":"bind-front","link":"#bind-front","children":[]},{"level":2,"title":"std::atomic_ref","slug":"std-atomic-ref","link":"#std-atomic-ref","children":[]},{"level":2,"title":"std::map<Key,T,Compare,Allocator>::contains","slug":"std-map-key-t-compare-allocator-contains","link":"#std-map-key-t-compare-allocator-contains","children":[]},{"level":2,"title":"std::barrier","slug":"std-barrier","link":"#std-barrier","children":[]},{"level":2,"title":"std::latch锁存器","slug":"std-latch锁存器","link":"#std-latch锁存器","children":[]},{"level":2,"title":"std::counting_semaphore","slug":"std-counting-semaphore","link":"#std-counting-semaphore","children":[]},{"level":2,"title":"string::starts_with / ends_with","slug":"string-starts-with-ends-with","link":"#string-starts-with-ends-with","children":[]},{"level":2,"title":"std::size","slug":"std-size","link":"#std-size","children":[]},{"level":2,"title":"std::is_bounded_array_v和std::is_unbounded_array","slug":"std-is-bounded-array-v和std-is-unbounded-array","link":"#std-is-bounded-array-v和std-is-unbounded-array","children":[]},{"level":2,"title":"std::erase_if","slug":"std-erase-if","link":"#std-erase-if","children":[]},{"level":2,"title":"Mathematical constants","slug":"mathematical-constants","link":"#mathematical-constants","children":[]},{"level":2,"title":"std::midpoint","slug":"std-midpoint","link":"#std-midpoint","children":[]},{"level":2,"title":"std::lerp","slug":"std-lerp","link":"#std-lerp","children":[]}],"git":{"createdTime":1686210777000,"updatedTime":1686625040000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":7}]},"readingTime":{"minutes":8.02,"words":2406},"filePathRelative":"posts/Program_language/cpp/cpp_cpp20_small_feature.md","localizedDate":"2023年6月8日","excerpt":"<h1> c++20的新增的小的特性</h1>\\n<p>c++20新增的特性非常多，其中concept，coroutine，module和range为四大特性，在之前的章节中已有涉及，本文则对其他的一些小改动进行讲解。</p>\\n<ul>\\n<li><a href=\\"#c20%E7%9A%84%E6%96%B0%E5%A2%9E%E7%9A%84%E5%B0%8F%E7%9A%84%E7%89%B9%E6%80%A7\\">c++20的新增的小的特性</a>\\n<ul>\\n<li><a href=\\"#stdformat\\">std::format</a></li>\\n<li><a href=\\"#calendar\\">Calendar</a></li>\\n<li><a href=\\"#timezone\\">timezone</a></li>\\n<li><a href=\\"#stdsource_location\\">std::source_location</a></li>\\n<li><a href=\\"#stdspan\\">std::span</a></li>\\n<li><a href=\\"#%E8%88%AA%E5%A4%A9%E9%A3%9E%E6%9C%BA%E8%BF%90%E7%AE%97%E7%AC%A6-\\">航天飞机运算符 &lt;=&gt;</a></li>\\n<li><a href=\\"#stdendian%E5%88%A4%E6%96%AD%E5%A4%A7%E5%B0%8F%E7%AB%AF\\">std::endian判断大小端</a></li>\\n<li><a href=\\"#stdremove_cvref\\">std::remove_cvref</a></li>\\n<li><a href=\\"#bind_front\\">bind_front</a></li>\\n<li><a href=\\"#stdatomic_ref\\">std::atomic_ref</a></li>\\n<li><a href=\\"#stdmapkeytcompareallocatorcontains\\"><code>std::map&lt;Key,T,Compare,Allocator&gt;::contains</code></a></li>\\n<li><a href=\\"#stdbarrier\\">std::barrier</a></li>\\n<li><a href=\\"#stdlatch%E9%94%81%E5%AD%98%E5%99%A8\\">std::latch锁存器</a></li>\\n<li><a href=\\"#stdcounting_semaphore\\">std::counting_semaphore</a></li>\\n<li><a href=\\"#stringstarts_with--ends_with\\">string::starts_with / ends_with</a></li>\\n<li><a href=\\"#stdsize\\">std::size</a></li>\\n<li><a href=\\"#stdis_bounded_array_v%E5%92%8Cstdis_unbounded_array\\">std::is_bounded_array_v和std::is_unbounded_array</a></li>\\n<li><a href=\\"#stderase_if\\">std::erase_if</a></li>\\n<li><a href=\\"#mathematical-constants\\">Mathematical constants</a></li>\\n<li><a href=\\"#stdmidpoint\\">std::midpoint</a></li>\\n<li><a href=\\"#stdlerp\\">std::lerp</a></li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{t as data};
