"use client";
import { createContext, useState } from "react";
import friends from "../../public/friends.json";

// export const [contact, setContact] = useState([]);

export const ContactHistoryContext = createContext();
const ContactHistoryProvider = ({ children }) => {
  const [contactHistory, setContactHistory] = useState({});

  const eggArr = Object.values(contactHistory);

  const entries = Object.entries(contactHistory).flatMap(([friendId, items]) => {
    const friend = friends.find((f) => f.id === parseInt(friendId));
    return items.map(({ type, time, timeMs }, index) => ({
      friendId,
      friendName: friend?.name,
      type: type,
      time: time,
      timeMs: timeMs,
      entryId: timeMs ? `${friendId}-${timeMs}-${index}` : `${friendId}-${time}-${index}`,
    }));
  });

  console.log(contactHistory);
  return (
    <ContactHistoryContext.Provider value={{ contactHistory, setContactHistory }}>
      {children}
    </ContactHistoryContext.Provider>
  );
};

export default ContactHistoryProvider;
/*

  let feedback = "";
  const newHandleClick = () => {
    switch (id) {
      case "call":
        feedback = [[...contact], "Tumar nana call maireseeehhheeey"];
        break;
      case "text":
        feedback = [[...contact], "Tumar nana text maireseeehhheeey"];
        break;
      case "video":
        feedback = [[...contact], "Tumar nana video maireseeehhheeey"];
        break;
      default:
        feedback = [[...contact], "Huputh koira pore giye daat vaingese"];
    }
  };

*/
/*
export function FuncyFriendEffect({ id }) {
  const [contact, setContact] = useState("");

  useEffect(() => {
    let msg = "";
    switch (id) {
      case "call":
        msg = "Tumar nana call maireseeehhheeey";
        break;
      case "text":
        msg = "Tumar nana text maireseeehhheeey";
        break;
      case "video":
        msg = "Tumar nana video maireseeehhheeey";
        break;
      default:
        msg = "Huputh koira pore giye daat vaingese";
    }
    setContact(msg);
    console.log(msg);
  }, [id]);

  return null; // or render something if needed
}
*/

/*


SyntheticBaseEvent {_reactName: 'onClick', _targetInst: null, type: 'click', nativeEvent: PointerEvent, target: button.group/button.shrink-0.justify-center.border.border-transparent.bg-clip-padding.text-sm.white…, …}
altKey
: 
false
bubbles
: 
true
button
: 
0
buttons
: 
0
cancelable
: 
true
clientX
: 
742
clientY
: 
745
ctrlKey
: 
false
currentTarget
: 
null
defaultPrevented
: 
false
detail
: 
1
eventPhase
: 
3
getModifierState
: 
ƒ modifierStateGetter(keyArg)
isDefaultPrevented
: 
ƒ functionThatReturnsFalse()
isPropagationStopped
: 
ƒ functionThatReturnsFalse()
isTrusted
: 
true
metaKey
: 
false
movementX
: 
0
movementY
: 
0
nativeEvent
: 
PointerEvent {isTrusted: true, pointerId: 3, width: 1, height: 1, pressure: 0, …}
pageX
: 
742
pageY
: 
745
relatedTarget
: 
null
screenX
: 
687
screenY
: 
824
shiftKey
: 
false
target
: 
button.group/button.shrink-0.justify-center.border.border-transparent.bg-clip-padding.text-sm.whitespace-nowrap.transition-all.outline-none.select-none.focus-visible:border-ring.focus-visible:ring-3.focus-visible:ring-ring/50.active:not-aria-[haspopup]:translate-y-px.disabled:pointer-events-none.disabled:opacity-50.aria-invalid:border-destructive.aria-invalid:ring-3.aria-invalid:ring-destructive/20.dark:aria-invalid:border-destructive/50.dark:aria-invalid:ring-destructive/40.[&_svg]:pointer-events-none.[&_svg]:shrink-0.[&_svg:not([class*='size-'])]:size-4.cursor-pointer.-translate-y-1.hover:scale-105.bg-primary.text-primary-foreground.[a]:hover:bg-primary/80.gap-1.5.has-data-[icon=inline-end]:pr-2.has-data-[icon=inline-start]:pl-2.flex.flex-col.h-full.items-center.font-medium.rounded-sm.p-4
timeStamp
: 
6077.899999999441
type
: 
"click"
view
: 
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
_reactName
: 
"onClick"
_targetInst
: 
null

*/
