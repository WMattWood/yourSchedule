# yourSchedule
A simple and intuitive scheduling app

One of the guiding design principles in this app has been redundancy. There are
many state values within the app which can be modified/set from multiple places
within the application.  This is by design, allowing the user to manipulate the
state of the app without conscious decision making - instead relying upon their
intuition and a general "feel" which is provided by the app's visual layout and
design.  Here are a few examples to illustrate this concept:

  1. The AddEventModal makes use of a setModalVisibility useState hook.  Rather
  than having this hook located directly within the CalendarPage component from
  which AddEventModal is rendered, the hook is stored instead insde the Calendar
  Context.  This allows the AddEventModal to be displayed or hidden via a button
  located on the main CalendarPage component, as well as with a "x" close modal
  button located in the AddEventModal component itself.  