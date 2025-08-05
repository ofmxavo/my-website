// Airtable integration configuration
const AIRTABLE_CONFIG = {
    apiKey: 'patSDetvcZ9PBLWv1.c2b14236e34aba2e9b44338ebd10fbac684951c09cb2af3cc8841a0e56de58e4',
    baseId: 'appy80tWzCIlOYbmz', // You'll need to provide this
    tableName: 'subscribers',
    apiUrl: 'https://api.airtable.com/v0'
};

// Function to submit subscriber data to Airtable
async function submitToAirtable(subscriberData) {
    const { firstName, lastName, email } = subscriberData;
    
    try {
        const response = await fetch(`${AIRTABLE_CONFIG.apiUrl}/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tableName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [{
                    fields: {
                        'First Name': firstName,
                        'Last Name': lastName,
                        'Email Address': email
                    }
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Airtable API error: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error submitting to Airtable:', error);
        return { success: false, error: error.message };
    }
}

// Export for use in other scripts
window.submitToAirtable = submitToAirtable;