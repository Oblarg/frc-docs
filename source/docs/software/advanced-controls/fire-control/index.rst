Fire Control
============

This section describes software approaches for aiming a robot's shooting mechanism at a goal.  Technical literature calls this "fire control", as it was first (and remains primarily) studied in the context of aiming artillery.

Fire control problems can typically be solved in one of two ways:

1. Direct-solve
2. Recursion

Direct-solve methods are computationally more-complex, but can be more accurate and can be more-flexibly adapted to account for small perturbations in the system.  In this documentation sequence, however, we primarily focus on recursion: it works very well in practice and is remarkably easy to understand, implement, and tune.

.. toctree::
   :maxdepth: 1

   static-shooting
   dynamic-shooting
