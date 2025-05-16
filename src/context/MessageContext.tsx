import {createContext, ReactNode, useContext, useState } from "react";


type MessageContextType = {
    messages: string[];
    addMessage: (message: string) => void;
    clearMessages: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider = ({children}: {children: ReactNode}) => {
    const [messages, setMessages] = useState<string[]>([]);
    
    const addMessage = (message: string) => {
        setMessages(prevMessages => [...prevMessages, message]);
    }

    const clearMessages = () => {
        setMessages([]);

    }

    return (
        <MessageContext.Provider value={{messages, addMessage, clearMessages}}>
            {children}
        </MessageContext.Provider>
    )

    /* KEY CONCEPTS HERE:

    1. {} in html (i.e in the 'value' parameter for the <MyContext.Provider> block, indicates a JSX object embedded in html)
    2. {} in JS means an OBJECT LITERAL. You can pass an object literal into a function/component (<>)


    ALSO props are like function arguments for components:

    function MyCustomGreeting(props: string) 
    */
}

const useMessages = () => {

    const context = useContext(MessageContext); 
    
    if (context === undefined) {
        throw new Error('useMessages must be used within a MessageProvider ')
    }

    return context;
} //convention for ANY hooks we create!

// eslint-disable-next-line react-refresh/only-export-components
export {MessageProvider, useMessages}

//when we talk about the children of the MessageProvider and its props, we are literally talking about whatever is between the component opening and closign:

/*

<MessageProvider>
    {children}
</MessageProvider>

*/