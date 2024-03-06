const e=JSON.parse('{"key":"v-5f755701","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture8-calling-c-functions.html","title":"第八讲 ： 栈的结构 c函数调用规约","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第八讲 ： 栈的结构 c函数调用规约 函数调用规约 回顾一下，当我们调用一个函数时，我们必须选择一些寄存器用于参数，至少一个用于返回值，一些寄存器用于调用者保存(caller-saved), 可供函数临时使用，一些寄存器用于被调用者已保存(callee-saved)。我们对这些函数的选择是为了与标准 Unix C ABI 调用约定保持一致，因此，通过更多的工作，我们的函数将与 C 标准库兼容。、 寄存器 使用 rax 用于函数返回值 rbx callee-preserved rcx 函数第四个参数 rdx 函数第三个参数 rsi 函数第二个参数 rdi 函数第一个参数 rbp callee-preserved rsp 栈顶指针 r8 函数第五个参数 r9 函数第六个参数 r10 临时变量(caller-preserved) r11 临时变量(caller-preserved) r12-r15 Callee-preserved","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture8-calling-c-functions.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第八讲 ： 栈的结构 c函数调用规约"}],["meta",{"property":"og:description","content":"第八讲 ： 栈的结构 c函数调用规约 函数调用规约 回顾一下，当我们调用一个函数时，我们必须选择一些寄存器用于参数，至少一个用于返回值，一些寄存器用于调用者保存(caller-saved), 可供函数临时使用，一些寄存器用于被调用者已保存(callee-saved)。我们对这些函数的选择是为了与标准 Unix C ABI 调用约定保持一致，因此，通过更多的工作，我们的函数将与 C 标准库兼容。、 寄存器 使用 rax 用于函数返回值 rbx callee-preserved rcx 函数第四个参数 rdx 函数第三个参数 rsi 函数第二个参数 rdi 函数第一个参数 rbp callee-preserved rsp 栈顶指针 r8 函数第五个参数 r9 函数第六个参数 r10 临时变量(caller-preserved) r11 临时变量(caller-preserved) r12-r15 Callee-preserved"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-06T06:52:15.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-06T06:52:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第八讲 ： 栈的结构 c函数调用规约\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-06T06:52:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"函数调用规约","slug":"函数调用规约","link":"#函数调用规约","children":[]},{"level":2,"title":"栈操作","slug":"栈操作","link":"#栈操作","children":[]},{"level":2,"title":"汇编中的排序","slug":"汇编中的排序","link":"#汇编中的排序","children":[]},{"level":2,"title":"检查排序情况","slug":"检查排序情况","link":"#检查排序情况","children":[]},{"level":2,"title":"插入排序","slug":"插入排序","link":"#插入排序","children":[]},{"level":2,"title":"C 兼容函数","slug":"c-兼容函数","link":"#c-兼容函数","children":[]},{"level":2,"title":"函数模板","slug":"函数模板","link":"#函数模板","children":[]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[{"level":3,"title":"课程资源","slug":"课程资源","link":"#课程资源","children":[]}]}],"git":{"createdTime":1709193295000,"updatedTime":1709707935000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":6.26,"words":1877},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture8-calling-c-functions.md","localizedDate":"2024年2月29日","excerpt":"<h1> 第八讲 ： 栈的结构 c函数调用规约</h1>\\n<h2> 函数调用规约</h2>\\n<p>回顾一下，当我们调用一个函数时，我们必须选择一些寄存器用于参数，至少一个用于返回值，一些寄存器用于调用者保存(caller-saved), 可供函数临时使用，一些寄存器用于被调用者已保存(callee-saved)。我们对这些函数的选择是为了与标准 Unix C ABI 调用约定保持一致，因此，通过更多的工作，我们的函数将与 C 标准库兼容。、</p>\\n<table>\\n<thead>\\n<tr>\\n<th>寄存器</th>\\n<th>使用</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><code>rax</code></td>\\n<td>用于函数返回值</td>\\n</tr>\\n<tr>\\n<td><code>rbx</code></td>\\n<td>callee-preserved</td>\\n</tr>\\n<tr>\\n<td><code>rcx</code></td>\\n<td>函数第四个参数</td>\\n</tr>\\n<tr>\\n<td><code>rdx</code></td>\\n<td>函数第三个参数</td>\\n</tr>\\n<tr>\\n<td><code>rsi</code></td>\\n<td>函数第二个参数</td>\\n</tr>\\n<tr>\\n<td><code>rdi</code></td>\\n<td>函数第一个参数</td>\\n</tr>\\n<tr>\\n<td><code>rbp</code></td>\\n<td>callee-preserved</td>\\n</tr>\\n<tr>\\n<td><code>rsp</code></td>\\n<td>栈顶指针</td>\\n</tr>\\n<tr>\\n<td><code>r8</code></td>\\n<td>函数第五个参数</td>\\n</tr>\\n<tr>\\n<td><code>r9</code></td>\\n<td>函数第六个参数</td>\\n</tr>\\n<tr>\\n<td><code>r10</code></td>\\n<td>临时变量(caller-preserved)</td>\\n</tr>\\n<tr>\\n<td><code>r11</code></td>\\n<td>临时变量(caller-preserved)</td>\\n</tr>\\n<tr>\\n<td><code>r12-r15</code></td>\\n<td>Callee-preserved</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{e as data};