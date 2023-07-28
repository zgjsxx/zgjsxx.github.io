const t=JSON.parse('{"key":"v-813bc77e","path":"/posts/tool/gdb/gdb_multithread_multiprocess.html","title":"gdb的多进程多线程调试技巧","lang":"zh-CN","frontmatter":{"category":["C++","gdb"],"tag":["C++"],"description":"gdb的多进程多线程调试技巧 前面我们了解过了gdb使用过程中的一些基础指令，在实际的开发过程中，程序通常都是多进程，多线程的。本节就将针对多线程和多进程场景下，如何使用gdb进行调试进行总结。 多线程 多线程调试常用命令 命令 效果 info threads 显示当前可调试的所有线程，每个线程会有一个id，带有*标记的是当前调试的线程。 thread &lt;ID&gt; 切换当前调试线程为指定的线程 set scheduler-locking off 不锁定任何线程，也就是所有线程都执行，这是默认值 set scheduler-locking on 只有当前被调试程序会执行 set scheduler-locking on step 在单步的时候，除了next过一个函数的情况(熟悉情况的人可能知道，这其实是一个设置断点然后continue的行为)以外，只有当前线程会执行 thread apply all command 让所有被调试线程执行GDB命令command thread apply ID1 ID2 command 让一个或者多个线程执行GDB命令command break thread_test.c:123 thread all 在所有线程中相应的行上设置断点 set print thread-events 控制是否打印线程启动、退出消息","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/tool/gdb/gdb_multithread_multiprocess.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"gdb的多进程多线程调试技巧"}],["meta",{"property":"og:description","content":"gdb的多进程多线程调试技巧 前面我们了解过了gdb使用过程中的一些基础指令，在实际的开发过程中，程序通常都是多进程，多线程的。本节就将针对多线程和多进程场景下，如何使用gdb进行调试进行总结。 多线程 多线程调试常用命令 命令 效果 info threads 显示当前可调试的所有线程，每个线程会有一个id，带有*标记的是当前调试的线程。 thread &lt;ID&gt; 切换当前调试线程为指定的线程 set scheduler-locking off 不锁定任何线程，也就是所有线程都执行，这是默认值 set scheduler-locking on 只有当前被调试程序会执行 set scheduler-locking on step 在单步的时候，除了next过一个函数的情况(熟悉情况的人可能知道，这其实是一个设置断点然后continue的行为)以外，只有当前线程会执行 thread apply all command 让所有被调试线程执行GDB命令command thread apply ID1 ID2 command 让一个或者多个线程执行GDB命令command break thread_test.c:123 thread all 在所有线程中相应的行上设置断点 set print thread-events 控制是否打印线程启动、退出消息"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-28T06:36:59.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:modified_time","content":"2023-07-28T06:36:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gdb的多进程多线程调试技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-28T06:36:59.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"多线程","slug":"多线程","link":"#多线程","children":[]},{"level":2,"title":"多线程调试常用命令","slug":"多线程调试常用命令","link":"#多线程调试常用命令","children":[]}],"git":{"createdTime":1690526219000,"updatedTime":1690526219000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":1.48,"words":445},"filePathRelative":"posts/tool/gdb/gdb_multithread_multiprocess.md","localizedDate":"2023年7月28日","excerpt":"<h1> gdb的多进程多线程调试技巧</h1>\\n<p>前面我们了解过了gdb使用过程中的一些基础指令，在实际的开发过程中，程序通常都是多进程，多线程的。本节就将针对多线程和多进程场景下，如何使用gdb进行调试进行总结。</p>\\n<h2> 多线程</h2>\\n<h2> 多线程调试常用命令</h2>\\n<table>\\n<thead>\\n<tr>\\n<th>命令</th>\\n<th>效果</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><code>info threads</code></td>\\n<td>显示当前可调试的所有线程，每个线程会有一个id，带有*标记的是当前调试的线程。</td>\\n</tr>\\n<tr>\\n<td><code>thread &lt;ID&gt;</code></td>\\n<td>切换当前调试线程为指定的线程</td>\\n</tr>\\n<tr>\\n<td><code>set scheduler-locking off</code></td>\\n<td>不锁定任何线程，也就是所有线程都执行，这是默认值</td>\\n</tr>\\n<tr>\\n<td><code>set scheduler-locking on</code></td>\\n<td>只有当前被调试程序会执行</td>\\n</tr>\\n<tr>\\n<td><code>set scheduler-locking on step</code></td>\\n<td>在单步的时候，除了next过一个函数的情况(熟悉情况的人可能知道，这其实是一个设置断点然后continue的行为)以外，只有当前线程会执行</td>\\n</tr>\\n<tr>\\n<td><code>thread apply all command</code></td>\\n<td>让所有被调试线程执行GDB命令command</td>\\n</tr>\\n<tr>\\n<td><code>thread apply ID1 ID2 command</code></td>\\n<td>让一个或者多个线程执行GDB命令command</td>\\n</tr>\\n<tr>\\n<td><code>break thread_test.c:123</code> thread all</td>\\n<td>在所有线程中相应的行上设置断点</td>\\n</tr>\\n<tr>\\n<td><code>set print thread-events</code></td>\\n<td>控制是否打印线程启动、退出消息</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{t as data};
