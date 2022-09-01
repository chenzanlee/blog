(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{278:function(v,t,a){"use strict";a.r(t);var _=a(10),e=Object(_.a)({},(function(){var v=this,t=v._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("p",[v._v("title: 7.4 java虚拟机的关闭\ntags:")]),v._v(" "),t("ul",[t("li",[v._v("翻译")]),v._v(" "),t("li",[v._v("Java并发编程实践\ncategories:")]),v._v(" "),t("li",[v._v("[Java,Java并发编程实践]\nauthor: 陈赞\ndate: 2021-04-07\nsticky: -74")])]),v._v(" "),t("hr"),v._v(" "),t("h1",{attrs:{id:"_7-4-java虚拟机的关闭"}},[v._v("7.4.java虚拟机的关闭")]),v._v(" "),t("p",[v._v("java虚拟机可能以有序的方式关闭，也可能突然的关闭。当最后一个普通的（非守护线程）线程终止时发起有序的关闭，可能通过调用"),t("code",[v._v("System.exit")]),v._v("，或者通过其他一些特定于平台的方式（诸如发送一个"),t("code",[v._v("SIGINT")]),v._v("或者敲击"),t("code",[v._v("Ctrl-C")]),v._v("）。尽管这是关闭java虚拟机的标准同时也是推荐的方式，java虚拟机仍然可能由于调用"),t("code",[v._v("Runtime.halt")]),v._v("或者通过操作系统杀死"),t("code",[v._v("jvm")]),v._v("进程的方式而突然关闭（例如发送一个"),t("code",[v._v("SIGKILL")]),v._v("指令）。")]),v._v(" "),t("h2",{attrs:{id:"_7-4-1关闭虚拟机的钩子方法"}},[v._v("7.4.1关闭虚拟机的钩子方法")]),v._v(" "),t("p",[v._v("有序关闭时，java虚拟机会启动所有已经注册的关闭钩子。关闭钩子是那些通过"),t("code",[v._v("Runtime.addShutdownHook")]),v._v("注册的未启动的线程。java虚拟机无法保证关闭钩子的启动顺序。如果任何应用线程（守护线程或者非守护线程）在应用关闭时仍然在运行，它们将与关闭程序并发运行。当所有的关闭钩子方法完成，如果此时"),t("code",[v._v("runFinalizersOnExit")]),v._v("设置为真的话，java虚拟机可能会选择运行"),t("code",[v._v("finalizers")]),v._v("，然后再终止。java虚拟机不会去尝试停止或中断任何在应用关闭时仍然在运行的应用线程；当java虚拟机停止时他们将突然地终结掉。如果shundown钩子或者"),t("code",[v._v("finalizer")]),v._v("无法完成，那么有序的关闭过程将”挂起“，java虚拟机一定会突然地关闭。在突然地关闭时，java虚拟机不要求做任何除了停止虚拟机之外的事；shutdown钩子将不会运行。")]),v._v(" "),t("p",[v._v("shutdown钩子应该是线程安全的；当访问共享数据时，它们必须使用同步机制，并且要防止死锁，就像任何别的并发代码一样。而且，它们不应该对应用的状态（例如其它服务是否已经关闭或者所有的普通线程已经完成）或者java虚拟机的关闭的原因作出假设，并且因此应该被极其小心地编写。最后，它们应该尽可能快的退出，因为它们的存在推迟了java虚拟机的终止，此时用户也许正在等待java虚拟机快点终止。")]),v._v(" "),t("p",[v._v("shutdown hooks可以被用来做服务或者应用的清理工作，例如删除临时文件或者清理那些不能被操作系统自动关闭的资源。"),t("a",{attrs:{href:""}},[v._v("Listing 7.26")]),v._v("展示了"),t("a",{attrs:{href:""}},[v._v("Listing 7.16")]),v._v("中的"),t("code",[v._v("LogService")]),v._v("是怎样通过在它的"),t("code",[v._v("start")]),v._v("方法中注册一个shutdown钩子来确保退出时关闭日志文件。")]),v._v(" "),t("p",[v._v("因为shutdown钩子全部并发运行，关闭日志文件可能会影响到一些其他的想使用该"),t("code",[v._v("logger")]),v._v("的shutdown钩子。为了避免这个问题，shutdown钩子不能依赖那些可能被应用或者别的shutdown钩子关闭的服务。达到这一目的的一种方式是使用一个钩子来关闭所有待关闭的服务，而不是为每个待关闭的服务都创建一个钩子，让它来调用一系列的关闭动作。这确保了关闭动作能在一个单一的线程中顺序地执行，因此避免了关闭动作间的竞态条件或者死锁。无论你是否使用shutdown钩子，这一技巧都可以使用。顺序地而不是并发地执行关闭动作消除了大量潜在的可能导致失败的源头。在一个需要需要维护众多服务间显式的依赖信息的应用中，该技巧可以确保shutdown动作可以以正确的顺序执行。")]),v._v(" "),t("h3",{attrs:{id:"listing-7-26-注册一个关闭hook来阻止logging服务"}},[v._v("Listing 7.26. 注册一个关闭Hook来阻止Logging服务")]),v._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[v._v("public void start(){\n\tRuntime.getRuntime().addShutdownHook(new Thread(){\n\t\tpublic void run(){\n\t\t\ttry{\n\t\t\t\tLogService.this.stop();\n\t\t\t}catch(InterruptedException ignored)\n\t\t\t{}\n\t\t}\n\t}\n\n}\n")])])]),t("h2",{attrs:{id:"_7-4-2守护线程"}},[v._v("7.4.2守护线程")]),v._v(" "),t("p",[v._v("有时候你想要创建一个线程来执行一些帮助功能但是你不想这个线程的存在阻止到java虚拟机的关闭。这就是守护线程的所要做的。")]),v._v(" "),t("p",[v._v("线程分为两种类型：普通线程和守护线程。当java虚拟机启动时，它创建的所有线程，除了主线程，都是守护线程（诸如垃圾回收线程，其他的管理线程）。当一个线程被创建时，它默认继承创建它的线程的守护状态，所以默认情况下，主线程创建的任何线程也都是普通线程。")]),v._v(" "),t("p",[v._v("普通线程和守护线程的唯一不同就是当他们退出时会发生什么。当一个线程退出时，java虚拟机会执行一个正在运行的线程的清单动作，如果剩下的所有线程都是守护线程，它会发起一个有序的关闭。当java虚拟机终止，任何剩下的守护线程都被废弃——finally块不会执行，栈不会解除——java虚拟机仅仅退出。")]),v._v(" "),t("p",[v._v("守护线程应该少量使用——能随时放弃而不需要清理的正在处理中的活动很少。特别是使用守护线程来执行那些可能会执行I/O操作的任务是非常危险的。守护线程最好仅用于一些“家务管理”任务，诸如一个周期性地从缓存中移除过期的条目的后台线程。")]),v._v(" "),t("blockquote",[t("p",[v._v("守护线程不适宜管理应用中的一些服务的生命周期。")])]),v._v(" "),t("h2",{attrs:{id:"_7-4-3终结者"}},[v._v("7.4.3终结者")]),v._v(" "),t("p",[v._v("垃圾收集线程能够很好地回收那些不再需要的内存资源，但是一些资源，诸如文件或者套接字句柄，当不再需要时，必须显式地归还给操作系统。为了能够帮助回收这些资源，垃圾收集线程对那些拥有非平凡的"),t("code",[v._v("finalize")]),v._v("方法的对象特殊对待：当它们被垃圾回收线程回收后，"),t("code",[v._v("finalize")]),v._v("方法将被调用来释放那些持久化资源。\n既然"),t("code",[v._v("finalizer")]),v._v("可以运行在一个由java虚拟机管理的线程中，任务能够被一个"),t("code",[v._v("finalizer")]),v._v("访问的状态将会被不止一个线程访问，因此它们必须通过同步机制来访问。"),t("code",[v._v("Finalizers")]),v._v("不能保证它们什么时候运行，甚至无法保证它们是否会运行，并且它们致使那些带有非平台的"),t("code",[v._v("finalize")]),v._v("方法的对象有很大的性能开销。正确地编写它们也极其困难"),t("a",{attrs:{href:""}},[v._v("9待完善的链接")]),v._v("。大多数情况下，"),t("code",[v._v("finally")]),v._v("块和显式地"),t("code",[v._v("close")]),v._v("方法的结合能够比"),t("code",[v._v("finalizer")]),v._v("更好的管理资源；唯一的例外是当你需要管理那些持有通过本地方法获取到的资源的对象。基于这些原因及别的因素，尽量避免写或者使用带有"),t("code",[v._v("finializers")]),v._v("的类（除了平台类库中的类）。")]),v._v(" "),t("blockquote",[t("p",[v._v("避免Finalizers.")])]),v._v(" "),t("h1",{attrs:{id:"总结"}},[v._v("总结")]),v._v(" "),t("p",[v._v("任务，线程，服务，应用程序的生命周期结束问题可能会增加设计及实现它们的复杂度。Java没有提供抢占式的机制来取消活动或者终止线程。相反，它提供了一种协作式的中断机制，可以被用来取消任务，但是构建任务取消的协议及一致地使用这些协议完全由你来决定。使用FutureTask及Executor框架简化了能够被取消的任务和服务的构造工作。")])])}),[],!1,null,null,null);t.default=e.exports}}]);