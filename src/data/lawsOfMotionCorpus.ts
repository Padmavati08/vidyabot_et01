/**
 * ==============================================================================
 * Laws of Motion — Source Corpus (Class 9 Science, Chapter 1)
 * ==============================================================================
 * Transcribed from the uploaded chapter 1 PDF, organized into topic sections
 * for chunking and retrieval. This is the actual grounding material for the
 * RAG doubt-tutor — real textbook content, not summarized or paraphrased away
 * from the source facts, formulas, and worked examples.
 * ==============================================================================
 */

export interface CorpusSection {
  id: string;
  title: string;
  text: string;
}

export const LAWS_OF_MOTION_CORPUS: CorpusSection[] = [
  {
    id: 'motion-of-an-object',
    title: 'Motion of an object',
    text: `We see the motion of several objects every day. Sometimes we cannot see the motion of an object directly, as in the case of a breeze. Motion is a relative concept. If the position of an object is changing with respect to its surroundings, then it is said to be in motion. Otherwise, it is said to be at rest. For example, a person sitting next to you in a moving bus is not in motion relative to you, but both of you are in motion relative to someone standing on the road.`,
  },
  {
    id: 'distance-and-displacement',
    title: 'Distance and displacement',
    text: `Distance is the length of the actual path travelled by an object in motion while going from one point to another, whereas displacement is the minimum distance between the starting and finishing points. Even if the displacement of an object is zero, the actual distance traversed by it may not be zero. For example, if a person walks around the edge of a circular field of radius 100 m and returns to the starting point, the distance walked equals the circumference of the circle, but the displacement is zero because the start and end points are the same. Similarly, if a car goes from point P to point Q and returns to point P, the total distance travelled is twice the distance PQ, but the displacement is zero since it ends where it started.`,
  },
  {
    id: 'speed-and-velocity',
    title: 'Speed and velocity',
    text: `Speed = Total distance travelled / Time required. The distance travelled in one direction by an object in unit time is called its velocity. Velocity = Displacement / Time. The units of speed and velocity are the same: in the SI system, the unit is m/s, while in the CGS system it is cm/s. Speed is related to distance while velocity is related to displacement. If the motion is along a straight line, the values of speed and velocity are the same; otherwise they can be different. Velocity is the displacement that occurs in unit time. For example, if the straight-line distance between two houses is 500 m and between one house and school is 1200 m, and the straight-line distance directly between the other house and school is 1300 m, then average speed is calculated as total distance divided by total time, while velocity is calculated as total displacement (the straight-line distance) divided by total time — these two values are usually different unless the path is a straight line.`,
  },
  {
    id: 'effect-of-speed-and-direction-on-velocity',
    title: 'Effect of speed and direction on velocity',
    text: `Velocity depends on both speed and direction. Velocity changes when: (1) the speed changes while the direction remains the same, (2) the direction changes while the speed remains the same (such as during a turn on a road), or (3) both the speed and the direction change simultaneously. Even if an object's speed stays constant, changing its direction is still a change in velocity, because velocity is a vector quantity with both magnitude and direction.`,
  },
  {
    id: 'uniform-and-non-uniform-motion',
    title: 'Uniform and non-uniform linear motion',
    text: `If an object covers equal distances in equal time intervals, it is said to be moving with uniform speed. If an object covers unequal distances in equal time intervals, it is said to be moving with non-uniform speed. For example, a vehicle being driven through heavy traffic typically moves with non-uniform speed, covering different distances in each successive time interval.`,
  },
  {
    id: 'acceleration',
    title: 'Acceleration',
    text: `The rate of change of velocity is called acceleration. Acceleration = Change in velocity / Time. If the initial velocity is 'u' and in time 't' it changes to the final velocity 'v', then acceleration a = (v - u) / t. If the velocity of an object changes during a certain time period, it is said to have accelerated motion. If the velocity changes by equal amounts in equal time intervals, the object is said to be in uniform acceleration. If the velocity changes by unequal amounts in equal time intervals, the object is said to be in non-uniform acceleration. When an object is at rest at the beginning of motion, its initial velocity is zero. When an object comes to rest at the end of motion, its final velocity is zero.`,
  },
  {
    id: 'positive-negative-zero-acceleration',
    title: 'Positive, negative and zero acceleration',
    text: `An object can have positive or negative acceleration. When the velocity of an object increases, the acceleration is positive and is in the direction of velocity. When the velocity of an object decreases with time, it has negative acceleration, also called deceleration; its direction is opposite to the direction of velocity. If the velocity of an object does not change with time, it has zero acceleration.`,
  },
  {
    id: 'distance-time-graphs',
    title: 'Distance-time graph for uniform and non-uniform motion',
    text: `An object in uniform motion covers equal distances in equal time intervals, so the graph between distance and time is a straight line. For non-uniform motion, the distance changes non-uniformly with time, so the distance-time graph is a curve, not a straight line, showing that there is no direct proportionality between distance and time in non-uniform motion.`,
  },
  {
    id: 'velocity-time-graphs',
    title: 'Velocity-time graph for uniform velocity and uniform acceleration',
    text: `For an object moving with uniform velocity, the velocity-time graph is a horizontal straight line, since velocity does not change with time. The distance covered by the object between two time instants can be determined from the area under the velocity-time graph between those two instants (this area equals a rectangle's area for uniform velocity). For uniformly accelerated motion, the velocity changes by equal amounts in equal time intervals, and the velocity-time graph is a straight line with a slope, since the velocity is continuously increasing. For non-uniformly accelerated motion, the velocity-time graph may have any shape depending on how the acceleration changes with time. The average velocity during a given time interval for uniformly accelerated motion is (v1 + v2) / 2 (average of the velocities at the start and end of the interval), and the distance covered equals average velocity multiplied by the time interval, which is also equal to the area under the velocity-time graph (a trapezium) for that interval.`,
  },
  {
    id: 'equations-of-motion-derivation',
    title: 'Equations of motion using graphical method',
    text: `Newton studied motion of an object and gave three equations of motion relating displacement, velocity, acceleration and time of an object moving along a straight line, for an object with initial velocity u, final velocity v, time t, acceleration a, and displacement s.

First equation of motion (velocity-time relation): v = u + at. This is derived from the velocity-time graph: acceleration a = (final velocity - initial velocity) / time = (v - u) / t, so v = u + at.

Second equation of motion (displacement-time relation): s = ut + (1/2)at². This is derived from the fact that the distance covered equals the area under the velocity-time graph, which is the sum of a rectangle (area = u × t) and a triangle (area = (1/2) × at × t = (1/2)at²), giving s = ut + (1/2)at².

Third equation of motion (displacement-velocity relation): v² = u² + 2as. This is derived using the trapezium area formula: s = (1/2) × (u + v) × t, and substituting t = (v - u)/a from the first equation gives s = (v² - u²) / (2a), which rearranges to v² = u² + 2as.`,
  },
  {
    id: 'uniform-circular-motion',
    title: 'Uniform circular motion',
    text: `When an object moves with constant speed along a circular path, the motion is called uniform circular motion — for example, the motion of a stone in a sling, or a point on a bicycle wheel in uniform motion, or the tip of a clock's second hand. Even though the speed is constant, the direction of velocity is constantly changing because the object is moving along a curved path, so uniform circular motion is accelerated motion (the change in velocity is due to the change in direction, not speed). If an object moving along a circular path of radius r takes time t to complete one round back to its starting position, its speed can be found using: Speed = Circumference / Time, i.e., v = 2πr / t, where r is the radius of the circle. In uniform circular motion, an object's direction of motion (velocity) is along the tangent to the circle at that point, and this direction changes continuously as the object moves around the circle — this is demonstrated by a coin on a spinning disc being thrown off in the direction of the tangent at the point it was released.`,
  },
  {
    id: 'newtons-first-law',
    title: "Newton's first law of motion (Law of Inertia)",
    text: `Newton's first law of motion states: "An object continues to remain at rest or in a state of uniform motion along a straight line unless an external unbalanced force acts on it." This is also called the law of inertia, because it describes inertia — the inability of an object to change its state of motion (rest or uniform motion) on its own. Inertia is related to the mass of an object: greater mass means greater inertia. Balanced forces are equal forces acting in opposite directions that cancel out, resulting in zero net force and no change in the object's state of motion (like in a tug-of-war where both sides pull equally). Unbalanced forces result in a non-zero net force, which causes a change in the state of motion. When an object is at rest or moving uniformly, it does not mean no forces act on it — rather, the forces acting on it are balanced so the net force is zero. Examples of inertia: a static object does not move without an external force; a force sufficient to lift a book cannot lift a heavier table; fruits fall from a tree when its branches are shaken (the fruit's inertia keeps it momentarily at rest while the branch moves); an electric fan keeps rotating for some time after being switched off (due to its own inertia of motion). Everyday examples: passengers jerk backward when a bus suddenly starts (their body's inertia resists the change from rest), and passengers jerk forward when a moving bus suddenly stops (their body's inertia keeps it moving forward).`,
  },
  {
    id: 'newtons-second-law-momentum',
    title: "Newton's second law of motion and Momentum",
    text: `Momentum (P) is the product of the mass and velocity of an object: P = m × v. Momentum is a vector quantity, and its direction is the same as the direction of velocity. In the SI system, the unit of momentum is kg·m/s; in the CGS system it is g·cm/s. The effect of one object striking another depends on both the mass and the velocity of the striking object, which is why Newton termed this combined property "momentum." Newton's second law of motion states: "The rate of change of momentum is proportional to the applied force, and the change of momentum occurs in the direction of the force." If a force F acts on an object of mass m for time t, changing its velocity from initial u to final v: initial momentum = mu, final momentum = mv, so rate of change of momentum = (mv - mu)/t = m(v - u)/t = ma. Since rate of change of momentum is proportional to applied force: ma ∝ F, so F = k·ma where k is a constant of proportionality equal to 1, giving F = m × a (Force = mass × acceleration). Newton (N), the SI unit of force: the force necessary to cause an acceleration of 1 m/s² in an object of mass 1 kg is called 1 newton; 1 N = 1 kg × 1 m/s². In the CGS system, the unit of force is the dyne: the force necessary to cause an acceleration of 1 cm/s² in an object of mass 1 gram is called 1 dyne; 1 dyne = 1 g × 1 cm/s². If the same force F acts on different masses (starting from rest), the change in momentum (F×t) is the same for both, but the lighter object accelerates more (moves faster) than the heavier object, since a = F/m.`,
  },
  {
    id: 'newtons-third-law',
    title: "Newton's third law of motion",
    text: `Force cannot act alone in nature — force is a reciprocal action between two objects; forces are always applied in pairs. When one object applies a force on another object, the second object simultaneously applies an equal and opposite force on the first. Newton's third law states: "Every action force has an equal and opposite reaction force which acts simultaneously." The force applied by the first object is called the action force, and the force applied by the second object on the first is called the reaction force. Key points: action and reaction forces act in pairs — one force cannot exist by itself; they act simultaneously; and they act on different objects (not on the same object), so they do not cancel each other's effect. Examples: while hitting a ball with a bat, the speed of the bat decreases (reaction from the ball); a gun recoils (moves backward) when a bullet is fired (the bullet's forward action force produces an equal, opposite reaction force on the gun); rockets work by expelling gas downward/backward (action), which pushes the rocket upward/forward (reaction); a plastic boat with an inflated balloon fixed to a hole moves forward in water as air escapes backward from the balloon.`,
  },
  {
    id: 'conservation-of-momentum',
    title: 'Law of conservation of momentum',
    text: `Consider two objects A (mass m1, initial velocity u1) and B (mass m2, initial velocity u2) that collide. According to Newton's third law, the force object A exerts on B is equal and opposite to the force B exerts on A. Using F = ma and a = (v - u)/t for both objects, and equating the forces (F2 = -F1), it can be derived that: m1u1 + m2u2 = m1v1 + m2v2, where v1 and v2 are the velocities after collision. This means the total momentum before collision equals the total momentum after collision — this is the law of conservation of momentum: "When no external force acts on two interacting objects, their total momentum remains constant. It does not change." This is a corollary of Newton's third law — momentum is not destroyed but redistributed between the colliding objects: one object's momentum decreases while the other's increases, but the total remains constant. Recoil example: when a bullet of mass m1 is fired from a gun of mass m2, before firing both are at rest, so total initial momentum is zero. After firing, the bullet moves forward with velocity v1 and momentum m1v1; for total momentum to remain zero, the gun must move backward with a recoil velocity v2 such that m1v1 + m2v2 = 0, i.e., v2 = -(m1/m2) × v1. Since the gun's mass is much greater than the bullet's mass, the gun's recoil velocity is much smaller than the bullet's velocity, but their momenta are equal in magnitude and opposite in direction. The total momentum is also conserved during the launch of a rocket.`,
  },
  {
    id: 'worked-examples-speed-velocity',
    title: 'Worked examples: speed, velocity, and equations of motion',
    text: `Example: An athlete runs 400 m on a circular track in 25 seconds and returns to his original position. Average speed = total distance / total time = 400/25 = 16 m/s. Average velocity = total displacement / total time = 0/25 = 0 m/s (since displacement is zero — he returns to the starting point).

Example: An aeroplane taxies on the runway for 30 s with acceleration 3.2 m/s², starting from rest (u = 0). Using s = ut + (1/2)at²: s = 0×30 + (1/2)×3.2×30² = 1440 m.

Example: A kangaroo jumps 2.5 m vertically (s = 2.5 m), final velocity v = 0 at the top, acceleration due to gravity a = -9.8 m/s² (negative since it opposes the direction of velocity going up). Using v² = u² + 2as: 0 = u² + 2×(-9.8)×2.5, so u² = 49, giving initial velocity u = 7 m/s.

Example: A motorboat starts from rest (u = 0) and attains velocity 15 m/s in 5 s with uniform acceleration. Using a = (v-u)/t: a = (15-0)/5 = 3 m/s². Distance travelled using s = ut + (1/2)at²: s = 0×5 + (1/2)×3×5² = 37.5 m.`,
  },
  {
    id: 'worked-examples-momentum',
    title: 'Worked examples: momentum',
    text: `Example: A cannon of mass 500 kg recoils with a speed of 0.25 m/s. Momentum = mass × velocity = 500 × 0.25 = 125 kg·m/s.

Example: Two balls of masses 50 g (0.05 kg) and 100 g (0.1 kg) move in the same direction with velocities 3 m/s and 1.5 m/s respectively. They collide, and after collision the first ball moves at 2.5 m/s. By conservation of momentum: m1u1 + m2u2 = m1v1 + m2v2, so (0.05×3) + (0.1×1.5) = (0.05×2.5) + (0.1×v2), giving 0.3 = 0.125 + 0.1v2, so v2 = 1.75 m/s — the velocity of the second ball after collision.`,
  },
];
