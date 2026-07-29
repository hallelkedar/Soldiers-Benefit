import { mock } from "node:test";

const benefits = [];

export default {
    create: mock.fn((data) => {
        const existingIds = benefits.map(benfit => benfit.id)
        const newId = Math.max(1, ...existingIds) + 1
        const benefit = {newId, ...data}
        benefits.push(benefit)
        return newId
    }),
    find: mock.fn((filter) => {
        const benefit = benefits.find(benfit => benefit.soldierId === filter.soldierId)
        return benefit || null
    }),
    updateHistory: mock.fn((id, data) => {
        const benefit = benefits.find(benfit => benefit.id)
        if (!benefit) return null
        benefit = {...benefit, ...data}
        return true
    })
}