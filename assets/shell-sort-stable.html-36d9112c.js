import{_ as t,V as e,W as a,a0 as r}from"./framework-9a29aaa0.js";const s={},i=r('<h1 id="面试题-希尔排序是一种稳定排序吗" tabindex="-1"><a class="header-anchor" href="#面试题-希尔排序是一种稳定排序吗" aria-hidden="true">#</a> 面试题：希尔排序是一种稳定排序吗？</h1><p>对于算法的稳定性，有这样一个记忆技巧，不稳定排序是&quot;快些选队&quot;，对应于快速排序/希尔排序/选择排序/堆排序。希尔排序也名列其中，因此也是一种不稳定排序，本文将通过例子来解析希尔排序不稳定的原因。</p><h2 id="稳定性的定义" tabindex="-1"><a class="header-anchor" href="#稳定性的定义" aria-hidden="true">#</a> 稳定性的定义</h2><p><strong>稳定性</strong>就是指对于两个关键字相等的记录，它们在序列中的相对位置，在排序之前和排序之后没有发生改变。通俗地讲就是有两个关键字相等的数据A、B，排序前，A的位置是 i ，B的位置是 j，此时 i &lt; j，则如果在排序后A的位置还是在B之前，那么称它是稳定的。</p><h2 id="稳定性的分析" tabindex="-1"><a class="header-anchor" href="#稳定性的分析" aria-hidden="true">#</a> 稳定性的分析</h2><p>希尔排序是一个逐步排序的过程，它的本质是利用了插入排序，将一个无序的数组逐步变成有序的过程。</p><p>说明希尔排序是不稳定的，只需要举出一个反例就可以，看下面这样一个数组：</p><p>[13A， 12， 13B，33，82，25，59，94，65，23，45，27，73，25，39，10]，注意13A和13B在排序过程中的顺序变化。</p><p>当步长为5时，排序的过程如下所示：</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/datastructure_algorithm/shell-sort/shell-sort1.png" alt="select_sort1" tabindex="0" loading="lazy"><figcaption>select_sort1</figcaption></figure><p>当步长为2时，排序的过程如下所示：</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/datastructure_algorithm/shell-sort/shell-sort1.png" alt="select_sort2" tabindex="0" loading="lazy"><figcaption>select_sort2</figcaption></figure><p>当步长为1时，排序的过程如下所示：</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/datastructure_algorithm/shell-sort/shell-sort1.png" alt="select_sort3" tabindex="0" loading="lazy"><figcaption>select_sort3</figcaption></figure><p>可以很清晰地看出，在这个过程中，13A和13B的顺序发生了变化。因此希尔排序不是一个稳定排序。</p>',15),o=[i];function l(c,n){return e(),a("div",null,o)}const g=t(s,[["render",l],["__file","shell-sort-stable.html.vue"]]);export{g as default};