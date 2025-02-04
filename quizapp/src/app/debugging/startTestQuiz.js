import {sessionCreation} from "@/app/database/sessionCreation";


export default function startTestQuiz(setStatus) {
    const questions =
         [
            {
                "prompt": "Which of the following best defines encapsulation in OOP?",
                "answers": [
                    "Hiding the internal details of an object and only exposing what is necessary",
                    "Allowing multiple functions to have the same name but different implementations",
                    "Deriving new classes from existing ones",
                    "Binding functions to specific objects"
                ],
                "goodAnswer": 0,
                "explanation": "Encapsulation is the concept of hiding internal implementation details and exposing only the necessary parts of an object."
            },
            {
                "prompt": "Which OOP principle allows a subclass to provide a specific implementation of a method already defined in its superclass?",
                "answers": [
                    "Polymorphism",
                    "Encapsulation",
                    "Abstraction",
                    "Inheritance"
                ],
                "goodAnswer": 0,
                "explanation": "Polymorphism allows a subclass to override methods from its superclass, providing specific implementations."
            },
            {
                "prompt": "What is an abstract class?",
                "answers": [
                    "A class that cannot be instantiated and is meant to be extended",
                    "A class that can only contain abstract methods",
                    "A class that cannot have any methods",
                    "A class that can only be instantiated once"
                ],
                "goodAnswer": 0,
                "explanation": "An abstract class is a class that serves as a blueprint for other classes and cannot be instantiated."
            },
            {
                "prompt": "Which of the following is NOT a characteristic of object-oriented programming?",
                "answers": [
                    "Encapsulation",
                    "Inheritance",
                    "Compilation",
                    "Polymorphism"
                ],
                "goodAnswer": 2,
                "explanation": "Compilation is a process of converting code to machine instructions, not a principle of OOP."
            },
            {
                "prompt": "Which keyword is used in Java to inherit from a superclass?",
                "answers": [
                    "extends",
                    "inherits",
                    "super",
                    "override"
                ],
                "goodAnswer": 0,
                "explanation": "The 'extends' keyword is used in Java to define inheritance from a superclass."
            },
            {
                "prompt": "Which concept allows a class to have multiple methods with the same name but different parameters?",
                "answers": [
                    "Method overloading",
                    "Method overriding",
                    "Encapsulation",
                    "Abstraction"
                ],
                "goodAnswer": 0,
                "explanation": "Method overloading allows multiple methods to have the same name as long as they have different parameters."
            },
            {
                "prompt": "Which of the following statements about constructors is true?",
                "answers": [
                    "A constructor is automatically called when an object is created",
                    "Constructors cannot have parameters",
                    "A constructor can be called manually",
                    "A class can have only one constructor"
                ],
                "goodAnswer": 0,
                "explanation": "A constructor is automatically called when an object of a class is instantiated."
            },
            {
                "prompt": "What is the purpose of the `super` keyword in Java?",
                "answers": [
                    "To call a superclass method or constructor",
                    "To create a new instance of a class",
                    "To define a private variable",
                    "To override a method in the subclass"
                ],
                "goodAnswer": 0,
                "explanation": "The `super` keyword allows access to the methods and constructors of the superclass."
            },
            {
                "prompt": "What does multiple inheritance allow in OOP?",
                "answers": [
                    "A class to inherit from more than one class",
                    "A class to implement multiple interfaces",
                    "A class to have multiple methods",
                    "A class to have multiple constructors"
                ],
                "goodAnswer": 0,
                "explanation": "Multiple inheritance allows a class to inherit from more than one class, though some languages like Java do not support this directly."
            },
            {
                "prompt": "Which of these OOP concepts is used to model real-world entities?",
                "answers": [
                    "Objects",
                    "Functions",
                    "Loops",
                    "Variables"
                ],
                "goodAnswer": 0,
                "explanation": "Objects represent real-world entities and encapsulate their properties and behaviors."
            },
            {
                "prompt": "Which OOP principle ensures that a derived class can use methods of a base class?",
                "answers": [
                    "Inheritance",
                    "Encapsulation",
                    "Polymorphism",
                    "Abstraction"
                ],
                "goodAnswer": 0,
                "explanation": "Inheritance allows a derived class to use methods and properties of a base class."
            },
            {
                "prompt": "Which of the following best describes polymorphism?",
                "answers": [
                    "The ability of different objects to respond to the same function call differently",
                    "Hiding implementation details from the user",
                    "Preventing modification of a class",
                    "Deriving new classes from existing ones"
                ],
                "goodAnswer": 0,
                "explanation": "Polymorphism allows objects to respond differently to the same function call."
            },
            {
                "prompt": "Which of the following is a benefit of encapsulation?",
                "answers": [
                    "Restricting direct access to data members",
                    "Allowing a class to inherit from another",
                    "Allowing multiple methods with the same name",
                    "Improving performance by reducing memory usage"
                ],
                "goodAnswer": 0,
                "explanation": "Encapsulation restricts direct access to data members and allows controlled access via methods."
            },
            {
                "prompt": "Which of these is NOT a feature of OOP?",
                "answers": [
                    "Structured programming",
                    "Encapsulation",
                    "Abstraction",
                    "Polymorphism"
                ],
                "goodAnswer": 0,
                "explanation": "Structured programming is a programming paradigm that predates OOP."
            },
            {
                "prompt": "What happens if a class implements an interface but does not provide implementations for all methods?",
                "answers": [
                    "It must be declared abstract",
                    "It will throw a compilation error",
                    "It can still be instantiated",
                    "It will automatically inherit default implementations"
                ],
                "goodAnswer": 0,
                "explanation": "A class that does not implement all methods of an interface must be declared abstract."
            },
            {
                "prompt": "What is the default access modifier in Java?",
                "answers": [
                    "Package-private",
                    "Public",
                    "Private",
                    "Protected"
                ],
                "goodAnswer": 0,
                "explanation": "If no access modifier is specified, Java uses package-private visibility by default."
            },
            {
                "prompt": "What is method overriding?",
                "answers": [
                    "Redefining a method in a subclass that already exists in the parent class",
                    "Defining multiple methods with the same name but different parameters",
                    "Preventing a method from being accessed outside a class",
                    "Defining a static method inside a class"
                ],
                "goodAnswer": 0,
                "explanation": "Method overriding occurs when a subclass provides a specific implementation of a method defined in the parent class."
            },
            {
                "prompt": "Which of the following is true about interfaces in Java?",
                "answers": [
                    "An interface can only contain abstract methods",
                    "An interface can have constructors",
                    "An interface cannot extend another interface",
                    "An interface can contain instance variables"
                ],
                "goodAnswer": 0,
                "explanation": "Before Java 8, interfaces could only contain abstract methods."
            },
            {
                "prompt": "Which of these allows defining a blueprint for a class without implementation details?",
                "answers": [
                    "Abstract class",
                    "Concrete class",
                    "Static class",
                    "Final class"
                ],
                "goodAnswer": 0,
                "explanation": "An abstract class defines a blueprint for other classes without requiring full implementations."
            }
        ];

    sessionCreation(questions, setStatus);

}