const s=JSON.parse('{"key":"v-5ebeeb36","path":"/posts/electricity/Latch/SR-latch.html","title":"触发器","lang":"zh-CN","frontmatter":{"description":"触发器 SR锁存器 SR锁存器可以由或非门组成： SR锁存器 其特性表如下所示： SD​ RD​ Q Q∗ 0 0 0 0 0 0 1 1 1 0 0 1 1 0 1 1 0 1 0 0 0 1 1 0 1 1 0 0 1 1 1 0","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/electricity/Latch/SR-latch.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"触发器"}],["meta",{"property":"og:description","content":"触发器 SR锁存器 SR锁存器可以由或非门组成： SR锁存器 其特性表如下所示： SD​ RD​ Q Q∗ 0 0 0 0 0 0 1 1 1 0 0 1 1 0 1 1 0 1 0 0 0 1 1 0 1 1 0 0 1 1 1 0"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-28T07:40:44.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-28T07:40:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"触发器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-28T07:40:44.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"SR锁存器","slug":"sr锁存器","link":"#sr锁存器","children":[]},{"level":2,"title":"电平触发的触发器","slug":"电平触发的触发器","link":"#电平触发的触发器","children":[]},{"level":2,"title":"脉冲触发的触发器","slug":"脉冲触发的触发器","link":"#脉冲触发的触发器","children":[]},{"level":2,"title":"边沿触发器","slug":"边沿触发器","link":"#边沿触发器","children":[]}],"git":{"createdTime":1690528984000,"updatedTime":1690530044000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":1.14,"words":341},"filePathRelative":"posts/electricity/Latch/SR-latch.md","localizedDate":"2023年7月28日","excerpt":"<h1> 触发器</h1>\\n<h2> SR锁存器</h2>\\n<p>SR锁存器可以由或非门组成：</p>\\n<figure><img src=\\"https://github.com/zgjsxx/static-img-repo/raw/main/blog/electricity/SR-latch/SR-latch.png\\" alt=\\"SR锁存器\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>SR锁存器</figcaption></figure>\\n<p>其特性表如下所示：</p>\\n<table>\\n<thead>\\n<tr>\\n<th><span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8333em;vertical-align:-0.15em;\\"></span><span class=\\"mord\\"><span class=\\"mord\\"><span class=\\"mord mathnormal\\" style=\\"margin-right:0.05764em;\\">S</span></span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.3283em;\\"><span style=\\"top:-2.55em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mathnormal mtight\\" style=\\"margin-right:0.02778em;\\">D</span></span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span></span></span></span></th>\\n<th><span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8333em;vertical-align:-0.15em;\\"></span><span class=\\"mord\\"><span class=\\"mord\\"><span class=\\"mord mathnormal\\" style=\\"margin-right:0.00773em;\\">R</span></span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.3283em;\\"><span style=\\"top:-2.55em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mathnormal mtight\\" style=\\"margin-right:0.02778em;\\">D</span></span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span></span></span></span></th>\\n<th><span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8778em;vertical-align:-0.1944em;\\"></span><span class=\\"mord mathnormal\\">Q</span></span></span></span></th>\\n<th><span class=\\"katex\\"><span class=\\"katex-mathml\\"></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8831em;vertical-align:-0.1944em;\\"></span><span class=\\"mord\\"><span class=\\"mord\\"><span class=\\"mord mathnormal\\">Q</span></span><span class=\\"msupsub\\"><span class=\\"vlist-t\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.6887em;\\"><span style=\\"top:-3.063em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mtight\\">∗</span></span></span></span></span></span></span></span></span></span></span></span></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>0</td>\\n<td>0</td>\\n<td>0</td>\\n<td>0</td>\\n</tr>\\n<tr>\\n<td>0</td>\\n<td>0</td>\\n<td>1</td>\\n<td>1</td>\\n</tr>\\n<tr>\\n<td>1</td>\\n<td>0</td>\\n<td>0</td>\\n<td>1</td>\\n</tr>\\n<tr>\\n<td>1</td>\\n<td>0</td>\\n<td>1</td>\\n<td>1</td>\\n</tr>\\n<tr>\\n<td>0</td>\\n<td>1</td>\\n<td>0</td>\\n<td>0</td>\\n</tr>\\n<tr>\\n<td>0</td>\\n<td>1</td>\\n<td>1</td>\\n<td>0</td>\\n</tr>\\n<tr>\\n<td>1</td>\\n<td>1</td>\\n<td>0</td>\\n<td>0</td>\\n</tr>\\n<tr>\\n<td>1</td>\\n<td>1</td>\\n<td>1</td>\\n<td>0</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{s as data};