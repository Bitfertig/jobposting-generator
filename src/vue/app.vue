<template>
    <div class="container">

        <h1 class="text-center">JobPosting Generator</h1>

        <p></p>

        <div class="row">
            <div class="col col-md-6">
                
                <div class="form-group">
                    <label for="date_posted">Date posted</label>
                    <input type="date" class="form-control" id="date_posted" aria-describedby="date_posted_help" v-model="date_posted">
                    <small id="date_posted_help" class="form-text text-muted">help.</small>
                </div>
                
                <div class="form-group">
                    <label for="valid_through">Expire date</label>
                    <input type="date" class="form-control" id="valid_through" aria-describedby="valid_through_help" v-model="valid_through">
                    <small id="valid_through_help" class="form-text text-muted">help.</small>
                </div>
                
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" aria-describedby="title_help" v-model="title">
                    <small id="title_help" class="form-text text-muted">help.</small>
                </div>

                <div class="form-group">
                    <label for="description">description</label>
                    <textarea class="form-control" id="description" rows="4" aria-describedby="description_help" v-model="description"></textarea>
                    <small id="description_help" class="form-text text-muted">help.</small>
                </div>

                <div class="form-group">
                    <label for="organization">Organization</label>
                    <input type="text" class="form-control" id="organization" aria-describedby="organization_help" v-model="organization">
                    <small id="organization_help" class="form-text text-muted">help.</small>
                </div>

                <div class="form-group">
                    <label for="organization_url">Organization URL</label>
                    <input type="url" class="form-control" id="organization_url" aria-describedby="organization_url_help" v-model="organization_url">
                    <small id="organization_url_help" class="form-text text-muted">help.</small>
                </div>

                <div class="form-group">
                    <label for="employment_type">Employment type</label>
                    <select class="form-control" id="employment_type" aria-describedby="employment_type_help" v-model="employment_type">
                        <option value="FULL_TIME">Full time</option>
                        <option value="PART_TIME">Part time</option>
                        <option value="CONTRACTOR">Contractor</option>
                        <option value="TEMPORARY">Temporary</option>
                        <option value="INTERN">Intern</option>
                        <option value="VOLUNTEER">Volunteer</option>
                        <option value="PER_DIEM">Per diem</option>
                        <option value="OTHER">Other</option>
                    </select>
                    <small id="employment_type_help" class="form-text text-muted">help.</small>
                </div>
                
                <div class="form-group">
                    <label for="street">Street</label>
                    <input type="text" class="form-control" id="street" aria-describedby="street_help" v-model="street">
                    <small id="street_help" class="form-text text-muted">help.</small>
                </div>
                
                <div class="form-group">
                    <label for="postal_code">Postal code</label>
                    <input type="text" class="form-control" id="postal_code" aria-describedby="postal_code_help" v-model="postal_code">
                    <small id="postal_code_help" class="form-text text-muted">help.</small>
                </div>
                
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" aria-describedby="city_help" v-model="city">
                    <small id="city_help" class="form-text text-muted">help.</small>
                </div>
                
                <div class="form-group">
                    <label for="country">Country</label>
                    <select class="form-control" id="country" aria-describedby="country_help" v-model="country">
                        <template v-for="(item, index) in countryFlagEmoji.list">
                            <option :key="index" :value="item.code">{{ item.name }} {{ item.emoji }}</option>
                        </template>
                    </select>
                    <small id="country_help" class="form-text text-muted">help.</small>
                </div>


            </div>
            <div class="col col-md-6">
                
                <pre><code class="hljs language-javascript" v-html="jobposting_json"></code></pre>

            </div>
        </div>

    </div>
</template>

<script>

//import hljs from 'highlight.js'; // all languages
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
//import 'highlight.js/scss/vs2015.scss';
import 'highlight.js/scss/atom-one-dark.scss';

var beautify = require('js-beautify').js;

//import { mapGetters, mapActions } from 'vuex';
//import comp from './comp.vue';
export default {
    components: {
        //comp,
    },
    data: function() {
        return {
            date_posted: '',
            valid_through: '',
            title: '',
            description: '',
            organization: '',
            organization_url: '',
            employment_type: '',
            street: '',
            city: '',
            postal_code: '',
            country: '',
        }
    },
    computed: {
        jobposting_json: {
            get: function() {

                var date_posted = this.date_posted;
                var valid_through = this.valid_through;
                var title = this.title;
                var description = this.description;
                var organization = this.organization;
                var organization_url = this.organization_url;
                var employment_type = this.employment_type;
                var street = this.street;
                var city = this.city;
                var postal_code = this.postal_code;
                var country = this.country;

                var json = `
                {
                    "@context": "https://schema.org/",
                    "@type": "JobPosting",
                    "datePosted": "${date_posted}",
                    "validThrough": "${valid_through}",
                    "title": "${title}",
                    "description": "${description}",
                    "hiringOrganization" : {
                        "@type": "Organization",
                        "name": "${organization}",
                        "sameAs": "${organization_url}"
                    },
                    "employmentType": "${employment_type}",
                    "jobLocation": {
                        "@type": "Place",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "${street}",
                            "postalCode": "${postal_code}",
                            "addressLocality": "${city}",
                            "addressCountry": "${country}"
                        }
                    }
                }
                `;
                json = beautify(json, { indent_size: 4, space_in_empty_paren: true }); // Options: https://www.npmjs.com/package/js-beautify#options https://beautifier.io/
                
                var script = '<scr'+'ipt type="application/ld+json">\n' + json + '\n</scr'+'ipt>';
                script = hljs.highlightAuto( script ).value;

                return script;
            }/* ,
            set: function() {

            } */
        }
    },
    mounted () {
        console.log('app.vue mounted.');

        this.date_posted = (new Date()).toJSON().split('T')[0];

        var now = new Date();
        var valid_through = new Date(now.setMonth( now.getMonth() + 6 ));
        this.valid_through = valid_through.toJSON().split('T')[0];

    },
    methods: {
        
    },
}
</script>

<style>

</style>