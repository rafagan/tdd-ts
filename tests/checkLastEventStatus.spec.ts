import { set, reset } from 'mockdate'

type Event = {
    endDate: Date
    reviewDurationHour: number
}

class EventStatus {
    status: 'active' | 'inReview' | 'done'

    constructor(event?: Event) {
        if(event == null) {
            this.status = 'done'
            return
        }

        const now = new Date()
        if(event.endDate >= now) {
            this.status = 'active'
            return
        }

        const reviewDurationMs = event.reviewDurationHour * 60 * 60 * 1000
        const reviewDate = new Date(event.endDate.getTime() + reviewDurationMs)
        this.status = reviewDate >= now ? 'inReview' : 'done'
    }
}

class CheckLastEventStatusUseCase {
    constructor(private readonly loadLastEventRepository: LoadLastEventRepository) {}

    async execute(groupId: string): Promise<EventStatus> {
        const event = await this.loadLastEventRepository.loadLastEvent(groupId)
        return new EventStatus(event)
    }
}

interface LoadLastEventRepository {
    loadLastEvent(groupId: string): Promise<Event | undefined>
}

class FakeLoadLastEventRepository implements LoadLastEventRepository {
    groupId?: string
    eventStub?: Event

    async loadLastEvent(groupId: string): Promise<Event | undefined> {
        this.groupId = groupId
        return this.eventStub
    }
}

type SutOutput = {
    sut: CheckLastEventStatusUseCase,
    repository: FakeLoadLastEventRepository
}

const makeSut = (): SutOutput => {
    const repository = new FakeLoadLastEventRepository()
    const sut = new CheckLastEventStatusUseCase(repository)
    return {
        sut, repository
    }
}

describe('CheckLastEventStatusUseCase', () => {
    beforeAll(() => {
        set(new Date())
    })

    afterAll(() => {
        reset()
    })

    it('should get last event data', async () => {
        // Given / Arrange
        const groupIdDummy = 'dummy'
        const { sut, repository } = makeSut()

        // When / Act
        await sut.execute(groupIdDummy)

        // Assert / Then
        expect(repository.groupId).toBe(groupIdDummy)
    })

    it('should get last event data only once', async () => {
        // Given / Arrange
        const groupIdDummy = 'dummy'
        const { sut, repository } = makeSut()

        const mockFn = jest.fn()
        repository.loadLastEvent = mockFn

        // When / Act
        await sut.execute(groupIdDummy)

        // Assert / Then
        expect(mockFn.mock.calls.length).toBe(1)
        expect(mockFn.mock.calls[0][0]).toBe(groupIdDummy)
    })

    it('should get last event data (spy version)', async () => {
        // Given / Arrange
        const groupIdDummy = 'dummy'
        const { sut, repository } = makeSut()

        const spy = jest.spyOn(repository, 'loadLastEvent')

        // When / Act
        await sut.execute(groupIdDummy)

        // Assert / Then
        expect(repository.groupId).toBe(groupIdDummy)
        expect(spy).toBeCalled()
        expect(spy).toBeCalledTimes(1)
        expect(spy).lastCalledWith(groupIdDummy)
    })

    it('should return status done when group has no event', async () => {
        // Given / Arrange
        const { sut, repository } = makeSut()
        repository.eventStub = undefined

        // When / Act
        const eventStatus = await sut.execute('dummy')

        // Assert / Then
        expect(eventStatus.status).toBe('done')
    })

    it('should return status active when now is before event end time', async () => {
        // Given / Arrange
        const dummyHour = 0
        const afterNow = new Date(new Date().getTime() + 1)
        const { sut, repository } = makeSut()
        repository.eventStub = {
            endDate: afterNow,
            reviewDurationHour: dummyHour
        }

        // When / Act
        const eventStatus = await sut.execute('dummy')

        // Assert / Then
        expect(eventStatus.status).toBe('active')
    })

    it('should return status active when now is equals event end time', async () => {
        // Given / Arrange
        const dummyHour = 0
        const { sut, repository } = makeSut()
        const rightNow = new Date(new Date().getTime())
        repository.eventStub = {
            endDate: rightNow,
            reviewDurationHour: dummyHour
        }

        // When / Act
        const eventStatus = await sut.execute('dummy')

        // Assert / Then
        expect(eventStatus.status).toBe('active')
    })

    it('should return status inReview when now is after event end time', async () => {
        // Given / Arrange
        const { sut, repository } = makeSut()
        const beforeNow = new Date(new Date().getTime() - 1)
        repository.eventStub = {
            endDate: beforeNow,
            reviewDurationHour: 1
        }

        // When / Act
        const eventStatus = await sut.execute('dummy')

        // Assert / Then
        expect(eventStatus.status).toBe('inReview')
    })

    it('should return status inReview when now is before review time', async () => {
        // Given / Arrange
        const reviewDurationHour = 1
        const reviewDurationMs = reviewDurationHour * 60 * 60 * 1000
        const reviewDate = new Date(new Date().getTime() - reviewDurationMs)
        const { sut, repository } = makeSut()
        repository.eventStub = {
            endDate: reviewDate,
            reviewDurationHour: reviewDurationHour
        }

        // When / Act
        const eventStatus = await sut.execute('dummy')

        // Assert / Then
        expect(eventStatus.status).toBe('inReview')
    })

    it('should return status done when now is after review time', async () => {
        // Given / Arrange
        const reviewDurationHour = 1
        const reviewDurationMs = reviewDurationHour * 60 * 60 * 1000
        const beforeReviewDate = new Date(new Date().getTime() - reviewDurationMs - 1)
        const { sut, repository } = makeSut()
        repository.eventStub = {
            endDate: beforeReviewDate,
            reviewDurationHour: reviewDurationHour
        }

        // When / Act
        const eventStatus = await sut.execute('dummy')

        // Assert / Then
        expect(eventStatus.status).toBe('done')
    })
})