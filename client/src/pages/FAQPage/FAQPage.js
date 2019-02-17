/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                                Page: Practice Page
 * 
 *      Shows all the previously crowdsourced loans that the user can practice
 *      on. Think of this as the gateway to the beginning of a the CrowdVet
 *      practice platform.
 * 
 * State: None
 *  
 * Props: 
 *   string sector: Type of loan (ex: Education)
 *   string amount: Amount of money requested
 *   string location: Location of the non-profit entity
 *   object[] items: A an array of objects (properties = string title and object content) that we'll show in a grid
 *   object[] items: A an array of objects (properties = string title and object items (title, link) ) that we'll show in the table
 */

import React, {
    Component
} from 'react';
import './FAQPage.scss';
import CVCollapsible from '../../components/CVCollapsible/CVCollapsible';
import ProfileLead from '../../leads/ProfileLead/ProfileLead';

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

class FAQPage extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        /*

        input data structure:
        
            topics: [
                {
                    topic: "This is the topic title",
                    questions: [
                        {
                            title: "This is the question title for this topic",
                            content: <> JSX can go here, and text too </>
                        },
                        {...},
                        ...
                    ]
                },
                {...},
                ...
            ]
        */
    }

    map_topics(topics) {
        return topics.map((topic, id) => (
            <CVCollapsible id={id} expansion_key={"arrow"} title={topic.title + '\tID: ' + id}>
                {this.map_questions(topic.questions)}
            </CVCollapsible>
        ));
    }
    map_questions(questions) {
        return questions.map((question, id) => (
            <CVCollapsible id={id} expansion_key={"show/hide"} title={question.title + '\tID: ' + id}>
                {question.content}
            </CVCollapsible>
        ));
    }

    render() {
        const {topics} = this.props.data;
        return (
            <div className="content">
                <div className="FAQ-title">
                    <h1>
                        FAQ
                    </h1>
                    <textarea rows="1" cols="20" placeholder="Search by keyword..."></textarea>
                </div>
                <div className="FAQ-section">
                    {this.map_topics(topics)}
                </div>
                <div className="FAQ-comment">
                    
                </div>
            </div>
        );
    }
}

class FAQPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props
    sample_content = <div>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt libero a urna pharetra, 
                        vitae vestibulum dolor egestas. Praesent pretium aliquet purus, a euismod dolor laoreet auctor. 
                        Nulla massa lorem, ullamcorper feugiat pretium pellentesque, aliquam ut massa. Ut molestie diam 
                        nec auctor facilisis. Ut aliquam justo a eros vehicula, quis scelerisque dui faucibus. Nullam 
                        iaculis, odio eget euismod suscipit, ex dolor sollicitudin dolor, vitae varius mauris ligula sit 
                        amet nulla. Nullam ullamcorper ligula ac consectetur consequat. Nulla tristique augue id tortor 
                        tincidunt consequat. Maecenas posuere vel justo in pretium. Phasellus in varius nunc. Nunc 
                        imperdiet suscipit dui id congue. Donec tempor metus vitae eleifend imperdiet. Nulla et dui at 
                        arcu tincidunt luctus quis nec nisl. Maecenas id neque risus.
                        </p>
                        Donec quis malesuada risus. Vestibulum elementum sollicitudin mauris, quis suscipit neque varius 
                        tristique. Proin feugiat, turpis quis tempor suscipit, orci dolor mollis velit, id eleifend eros 
                        quam eleifend justo. Proin suscipit ipsum at molestie varius. Fusce pharetra odio ut purus 
                        faucibus, sit amet iaculis felis ultrices. Vivamus quam eros, lacinia vel pulvinar eu, tincidunt 
                        vitae nibh. Maecenas condimentum iaculis odio at malesuada. Etiam at pulvinar nunc. Quisque 
                        lobortis eros eget lacus viverra maximus. Donec vehicula libero metus, ut efficitur orci aliquam 
                        sit amet. In facilisis neque at rhoncus placerat. Proin ultricies nunc non mi scelerisque, quis 
                        luctus magna volutpat. Etiam et interdum neque.
                    </div>;
    sample_topic_title = "This is a sample topic title";
    sample_question_title = "This is a sample question title";
    data = {
        topics: [
            {
                title: this.sample_topic_title,
                questions: [
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    }
                ]
            },
            {
                title: this.sample_topic_title,
                questions: [
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    }
                ]
            },
            {
                title: this.sample_topic_title,
                questions: [
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    }
                ]
            },
            {
                title: this.sample_topic_title,
                questions: [
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    },
                    {
                        title: this.sample_question_title,
                        content: this.sample_content
                    }
                ]
            }
        ]
    };

    // @override
    async onPageLoad() {
        return;
    }

    // @override
    pageLead() {
        return (
            <ProfileLead 
            backgroundImage={'./img/headshot.jpg'}
            title={"title"}
            subtitle={"subtitle"}/>
        );
    }

    // @override
    pageContent() {
        return (
            <FAQPage data={this.data} />
        );
    }

}

export {
    FAQPage,
    FAQPageBuilder
};
