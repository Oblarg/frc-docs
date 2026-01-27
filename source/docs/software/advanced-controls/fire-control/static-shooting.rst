Static Shooting via Look-Up Table
==================================

This section describes how to design, populate, and use a look-up table (a "firing table") to aim at a stationary target from a stationary robot.

The Problem
-----------

We ultimately want to launch the game piece on a trajectory that will end up in the goal.  But:

1. Robots have a wide variety of shooting mechanisms, each with a specific relationship between their control variables (e.g. flywheel speed, hood angle, catapult release angle, etc.) and the trajectory of the game piece.  In general, these relationships are nonlinear and complex.
2. Calculating an exact trajectory for the gamepiece is in general *also* nonlinear and complex, due to factors such as air resistance, spin effects, and other gamepiece-specific properties.

Any method that attempts to "directly solve" the problem by calculating an exact trajectory, and then working backwards from that to find the correct control variables, must solve both of the above problems.

But, there is a simpler way: we can just experimentally determine the control variables that we *observe* to result in scoring the game piece, from a variety of different starting positions.  Then, to make a given shot, we can simply plug the starting position into the look-up table and use the corresponding control variables to reproduce the shot.

Building the Look-Up Table
--------------------------

To build the look-up table, we need to:

1. Pick a set of positions that we will experimentally shoot from.  This is setting the resolution of your table; in reality, your robot will never be exactly at a position that you recorded in the table, and you will have to interpolate between the recorded positions.  The higher the resolution of the table, the more accurate your shooting will be, but the more data you will need to collect and the more time it will take to build the table.  Generally, it is a good idea to start with a low resolution and increase it only if you observe that it is not sufficiently accurate.
2. "Dial in" the control variables that successfully score the game piece from each of the starting positions.  Note that if your shooter is not consistent at this stage, then there is nothing the software can do to compensate for it; the mechanical quality of your shooter is always more important than the subtlety of the control software.
3. (Optional) Measure the time-of-flight of the gamepiece to the goal from each of the starting positions, and record it in the table along with the control variables.  This is needed later, when we discuss shooting at moving targets or from a moving robot; recording this ahead-of-time reduces the amount of computation required at runtime, and improves the accuracy of the shoot-on-the-move algorithm.

Using the Look-Up Table
-----------------------

To use the look-up table, we:

1. Determine the relative position of the target from the robot.  This tells us where on the look-up table to find the corresponding control variables for the shot.  This will likely require some amount of vision processing or other sensor input.
2. Interpolate between the nearest recorded positions in the look-up table to find the corresponding control variables for the shot.
3. Set the control variables to the values found in the look-up table.
4. Shoot the game piece.

That's it.  This might seem like a crude approach, but for most problems it works very well.  Most shooting mechanisms have governing equations that, while complex, are still well-behaved enough (i.e., not chaotic, slowly-changing, etc.) that interpolating the look-up table is in fact a very good approximation of the exact solution.
