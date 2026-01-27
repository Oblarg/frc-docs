Dynamic Shooting via Time-of-Flight Recursion
=============================================

This section extends the look-up table approach we used for the static problem, and expands it with a simple recursion to handle moving targets and/or moving robots.  Crucially, we will use the *time-of-flight* parameter that we recorded ahead-of-time in the look-up table to predict the position of the target at the moment when the gamepiece will arrive.  Because the adjusted shot will in general have its own time-of-flight, this gives us a "feedback" loop that we can use to iteratively refine our shot.  Typically, this converges to the correct shot within a small number (3-5) of iterations.

The Problem
-----------

As before, we want to launch the game piece on a trajectory that will end up in the goal.  But now, the target and/or the robot are moving.  So, it is not enough to just plug the starting position into the look-up table and use the corresponding control variables to reproduce the shot; by the time the gamepiece arrives at the goal, the target will have moved to a new relative position.  We need to adjust our shot to account for the new relative position.

The Solution
------------

We assume we have a look-up table populated as in described in the previous section, including time-of-flight measurements for each entry.  We:

1. Determine the relative position *and velocity* of the target from the robot.  This tells us where on the look-up table to find the corresponding control variables for the shot, *and* how to adjust the shot to account for the relative motion of the robot and the target.
2. Interpolate between the nearest recorded positions in the look-up table to find the corresponding *time-of-flight* for the shot.
3. Use the time-of-flight to predict the relative position of the target at the moment when the gamepiece will arrive.  This is a simple calculation: we multiply the relative velocity vector to the target by the time of flight, and add it to the relative position of the target at the moment when the shot was taken.  This gives us a *new* value to look up in the look-up table, with its own time-of-flight and control variables.
4. Return to step 2, checking the table for the time-of-flight of the *adjusted* shot.  If it has changed substantially, we repeat the process; if it is stable, the iteration has converged and we proceed to the next step.  It typically takes no more than 3-5 iterations to converge.
5. Once the iteration has converged, we use the control variables found in the look-up table to shoot the game piece.

Interactive Visualization
-------------------------

Interact with the simulation below to see how the dynamic shooting recursion algorithm works.  Adjust the robot velocity, projectile velocity, shot tolerance, and iteration number to see how the algorithm converges to the correct shot (or doesn't).

.. note:: The visualization shows a top-down view of a 2D game field.  The robot is shown in blue, the target in orange.  The (draggable) robot velocity vector points in the direction of motion.  For each iteration, the virtual target (shown in green) is offset by the time-of-flight multiplied by the robot velocity vector.  The actual trajectory (shown in red) shows where the projectile actually would actually land, if fired at that iteration.  The blue envelope shows the region of convergence of the algorithm: the maximum velocity that can be achieved within the given number of iterations, within the specified tolerance.  The purple geodesic represents velocity vectors that are "optimal" in the sense that they have the best possible convergence behavior given their magnitude - notice how the convergence envelope follows the shape of the geodesic as it expands with increasing iteration count.

.. raw:: html

    <div class="viz-div" id="dynamic_shooting_container">
      <div class="flex-grid">
         <div class="col" id="dynamic_shooting_viz"></div>
         <div id="dynamic_shooting_ctrls"></div>
      </div>
      <script>
         dynamic_shooting = new DynamicShootingWidget("dynamic_shooting");
      </script>
    </div>

Notice that we do not need to involve the control variables for the intermediate steps in the recursion; we iterate *only* on the time-of-flight.  This is a key computational advantage of this approach: it works implicitly on the *geometry* of the look-up table, which *implicitly* encodes the physics of the problem in such a way that the motion-adjustment becomes independent of the specifics of the shooting mechanism physics (except as is latent in the structure of the time-of-flight measurements in the look-up table).

If we did not record the time-of-flight measurements in the look-up table, we would need to calculate the time-of-flight for each shot from the control variables, which would involve a physics model.  Measuring the time-of-flight at the time of table construction gives us enough surplus information to avoid the need for explicit physics modeling at all.
