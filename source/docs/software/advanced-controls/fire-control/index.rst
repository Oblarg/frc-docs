Fire Control
============

.. note:: Fire control is a difficult problem, and depends on the shooting mechanism and the gamepiece.  This sequence of articles covers one approach to solving fire-control in a "soft" conceptual manner that can apply to many different shooting mechanisms and gamepieces.  We do not provide example code; the core concept is so simple that working example code would be 90% distracting details of the assumed game context, and 10% fire-control algorithm.  If you understand the concepts presented here, you will be able to apply them to your own robot and gamepiece.

This section describes software approaches for aiming a robot's shooting mechanism at a goal.  Technical literature calls this "fire control", as it was first (and remains primarily) studied in the context of aiming artillery.

Fire control problems can be solved in one of two ways:

1. Direct-solve
2. Recursion

This sequence of articles only covers recursion, because direct-solve methods depend much more heavily on the specifics of the shooting mechanism and gamepiece.  Recursion is a general approach that can be applied to many different shooting mechanisms and gamepieces, and is relatively easy to understand, implement, and tune.

Recursive approaches have another advantage: they are their own error analysis.  By watching how the recursion converges, we can see how accurate the solution is likely to be.  The interactive visualization in the dynamic shooting article allows you to explore this behavior graphically.

.. toctree::
   :maxdepth: 1

   static-shooting
   dynamic-shooting
